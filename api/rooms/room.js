"use stricts"
var uuid = require("uuid/v4")

class Room {
    constructor(id, no, hotel_id, type){
        if (id == null) {
            this.id = uuid()
        } else {
            this.id = id
        }
        this.no = no
        this.hotel_id = hotel_id
        this.type = type
    }
}


module.exports = {
    Room
}