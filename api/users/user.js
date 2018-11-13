"use strict";

var uuid = require("uuid/v4")

// Constructor
class User{
    constructor(email, name, secret) {
        this.email = email
        this.name = name
        this.secret = secret
    }
}

module.exports = {
    User
}