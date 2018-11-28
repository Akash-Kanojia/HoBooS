"use strict"

var Cryptr = require('cryptr');

const sessionSecret = "hoboos-session-secret"

class CookieUtil {
    constructor(){
        this.cryptr = new Cryptr(sessionSecret);
    }
}
// Creates cookie for user.
CookieUtil.prototype.createCookie = function (email) {
    return this.cryptr.encrypt(email)
}

// Get user email from cookie.
CookieUtil.prototype.getUser = function(cookie){
    return this.cryptr.decrypt(cookie)
}

module.exports = {
    CookieUtil
}