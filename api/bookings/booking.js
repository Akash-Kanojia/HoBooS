"use stricts"
var uuid = require("uuid/v4")

// Booking represents a reservation of an accomodation for a user.
class Booking{
    constructor(id, user_email, hotel_id, room_id, from, to, no_of_people){
        if (id == null) {
            this.id = uuid()
        } else {
            this.id = id
        }
        this.user_email = user_email
        this.hotel_id = hotel_id
        this.room_id = room_id
        this.from = from
        this.to = to
        this.no_of_people = no_of_people
    }
}

module.exports = {
    Booking
}