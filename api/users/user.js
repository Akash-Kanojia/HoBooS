"use strict";
var crypto = require('crypto')

const passwordSalt = "hoboos-password-salt"
// Constructor
class User{
    constructor(email, name, password) {
        this.email = email
        this.name = name
        if (password !=  null && password != "") {
            // Persist the hash of the password to maintain privacy.
            this.secret = crypto.createHmac(
                "sha1", 
                passwordSalt,
            ).update(password)
            .digest("hex")
        }
    }
}

module.exports = {
    User,
    passwordSalt
}