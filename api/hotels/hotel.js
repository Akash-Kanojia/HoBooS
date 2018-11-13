"use stricts"
var uuid = require("uuid/v4")

class Hotel{
    constructor(id, name, location, type, rooms) {
        if (id == null) {
            this.id = uuid()
        } else {
            this.id = id
        }
        this.name = name
        this.location = location
        this.type = type
        this.romms = rooms
    }
}

module.exports = {
    Hotel
}