"use strict"
var User = require("../user.js").User
var passwordSalt = require("../user.js").passwordSalt
var Token = require("./token.js").Token
var crypto = require('crypto')

// Routes.
var Routes = {
    login: "/login",
    register: "/register"
}
// AuthServer listen and serves the user auth's rest api.
class AuthServer{
    constructor(UsersService, AuthService){
        this.UsersService = UsersService
        this.AuthService = AuthService
    }
}

// Inbvokes the server.
AuthServer.prototype.Invoke = function(app) {
    let UsersService = this.UsersService
    let AuthService = this.AuthService
    // Register user for hoboos.
    app.post(Routes.register, function (req, res) {
        var userReq = JSON.parse(JSON.stringify(req.body))
        if  (userReq.password == null || userReq.password == "") {
            res.status(400).send("password can't be empty")
        } else if (userReq.email == null || userReq.email == "") {
            res.status(400).send("email can't be empty")
        } else {
            var user = new User(
                userReq.email,
                userReq.name,
                userReq.password,
            )
            UsersService.Create(
                user,
            ).then(function(data){
                // console.log(data)
                res.send(user);
            }).catch(function(err){
                console.log("error in creating user, ", err);
                var responseBody = "error in creating user", err
                res.send(responseBody)
            })   
        }
     })

    // login user for hoboos.
    app.post(Routes.login, function (req, res) {
        var userReq = JSON.parse(JSON.stringify(req.body))
        if  (userReq.password == null || userReq.password == "") {
            res.status(400).send("password can't be empty")
        } else if (userReq.email == null || userReq.email == "") {
            res.status(400).send("email can't be empty")
        } else {
            UsersService.Find(
                {email: userReq.email},
            ).then(function(data){                
                let secret = crypto.createHmac(
                    "sha1", 
                    passwordSalt,
                ).update(userReq.password)
                .digest("hex")        

                // Ensure token.
                if (secret == data[0].secret) {
                    let userToken = req.get("hoboos-secret")
                    let token = new Token()
                    AuthService.Authenticate(
                        userToken,
                    ).then(function(data){
                        res.status(200).send("login success")
                    }).catch(function(err) {
                        res.send({"hoboos-secret": token.create(userReq.email)})
                    })
                } else {
                    res.status(400).send("password incorrect")
                }
            }).catch(function(err){
                console.log("error in login, ", err);
                var responseBody = "user not found " + err
                res.send(responseBody)
            })   
        }
     })
}

module.exports = {
    AuthServer,
    Routes
}