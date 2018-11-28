"use strict"

var Cryptr = require('cryptr');

const sessionSecret = "hoboos-session-secret"

class Token {
    constructor(){
        this.cryptr = new Cryptr(sessionSecret);
    }
}
// Creates cookie for user.
Token.prototype.create = function (email) {
    return this.cryptr.encrypt(email)
}

// Get user email from cookie.
Token.prototype.getUser = function(cookie){
    return this.cryptr.decrypt(cookie)
}

module.exports = {
    Token
}