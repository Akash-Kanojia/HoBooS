"use strict"
var User = require("../user.js").User
var passwordSalt = require("../user.js").passwordSalt
var crypto = require('crypto')
var CookieUtil = require("./cookie.js").CookieUtil

// Routes.
const login = "/login"
const register = "/register"

// AuthServer listen and serves the user auth's rest api.
class AuthServer{
    constructor(UsersService){
        this.UsersService = UsersService
    }
}

// Inbvokes the server.
AuthServer.prototype.Invoke = function(app) {
    let UsersService = this.UsersService
   
    // Register user for hoboos.
    app.post(register, function (req, res) {
        var userReq = JSON.parse(JSON.stringify(req.body))
        if  (userReq.password == null || userReq.password == "") {
            res.send("password can't be empty")
        } else if (userReq.email == null || userReq.email == "") {
            res.send("email can't be empty")
        } else {
            var user = new User(
                userReq.email,
                userReq.name,
                userReq.password,
            )
            UsersService.Create(
                user,
            ).then(function(data){
                console.log(data)
                res.send(user);
            }).catch(function(err){
                console.log("error in creating user, ", err);
                var responseBody = "error in creating user", err
                res.send(responseBody)
            })   
        }
     })

    // login user for hoboos.
    app.post(login, function (req, res) {
        var userReq = JSON.parse(JSON.stringify(req.body))
        if  (userReq.password == null || userReq.password == "") {
            res.send("password can't be empty")
        } else if (userReq.email == null || userReq.email == "") {
            res.send("email can't be empty")
        } else {
            UsersService.Find(
                {email: userReq.email},
            ).then(function(data){                
                let secret = crypto.createHmac(
                    "sha1", 
                    passwordSalt,
                ).update(userReq.password)
                .digest("hex")        

                // set cookie
                if (secret == data[0].secret) {
                    let cookie = req.cookies && req.cookies.hoboos_secret
                    let cookieUtil = new CookieUtil()
                    if (cookie === undefined)
                    {
                    // no: set a new cookie
                    res.cookie('hoboos_secret',cookieUtil.createCookie(userReq.email), { maxAge: 900000, httpOnly: true }).send("");
                    console.log('cookie created successfully');
                    } 
                    else
                    {
                    // yes, cookie was already present 
                    user = cookieUtil.getUser(cookie)
                    console.log('cookie exists', user);
                    } 
                }

            }).catch(function(err){
                console.log("error in creating user, ", err);
                var responseBody = "error in creating user", err
                res.send(responseBody)
            })   
        }
     })
}

module.exports = {
    AuthServer
}