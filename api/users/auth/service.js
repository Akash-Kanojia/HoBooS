"use strict"

var Promise = require("core-js").Promise
var Token = require("./token.js").Token

// AuthService represents tha service layer for auth.
class AuthService{
    constructor() {
    }
}

// Authenticates the current user.
AuthService.prototype.Authenticate = function(secretToken) {
    return new Promise(function(resolve, reject){
        let token = new Token()
        if (secretToken == undefined || secretToken == "" || secretToken == "undefined") {
            reject(new Error("Access denied please login."))            
        } else {
            // yes, token was already present 
            let user = token.getUser(secretToken)
            resolve(user)
        } 
    })
    
}

module.exports = {
    AuthService
}