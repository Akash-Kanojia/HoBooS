"use stricts"

var Booking = require("./booking.js").Booking
var Promise = require("core-js").Promise

// Routes.
const bookings = "/bookings"
const bookingByID = "/bookings/:id"
const availableRooms = "/rooms"

class BookingsServer{
    constructor(BookingsService){
        this.BookingsService = BookingsService
    }
}

BookingsServer.prototype.Invoke = function(app) {
    BookingsService = this.BookingsService
   
    // Create booking.
    app.post(bookings, function (req, res) {
        var hotel_id = req.get("hotel_id")
        var room_id = req.get("room_id")
        var user_email = req.get("user_email")
        var bookingReq = JSON.parse(JSON.stringify(req.body))
        var booking = new Booking(
            null,
            user_email,
            hotel_id,
            room_id,
            bookingReq.from,
            bookingReq.to,
            bookingReq.no_of_people
        )
        BookingsService.Create(
            booking,
        ).then(function(data){
            res.send(booking);
        }).catch(function(err){
            console.log("error in booking, ", err);
            res.send(("error in booking, ").concat(err))
        })
     })

     // Find bookings.
    app.get(bookings, function (req, res) {
        var filter = filterOptions(req)
    
        BookingsService.Find(
            filter,
        ).then(function(data){
            res.send(data);
        }).catch(function(err){
            console.log("error in fetching bookings, ", err)
            res.send("error in fetching bookings");
        })
    })

    // Update bookings.
    app.put(bookingByID, function(req, res) {
        // TODO: update bookings with limitations.
        res.send("can't update bookings at the moment")
    })

    // Delete bookings.
    app.delete(bookingByID, function(req, res) {
        // TODO: delete bookings with a valid usecase.
        res.send("can't delete bookings at the moment")
    })
}

// Helper method to create options object from request
function filterOptions(req) {
    var user_email = req.get("user_email")
    var hotel_id = req.get("hotel_id")
    var room_id = req.get("room_id")
    var from = req.get("from")
    var to = req.get("to")    

    var option = {}
    if (user_email != undefined && user_email != null) {
        option.user_email = user_email
    }
    if (hotel_id != undefined && hotel_id != null) {
        option.hotel_id = hotel_id
    }
    if (room_id != undefined && room_id != null) {
        option.room_id = room_id
    }
    if (from != undefined && from != null && to != undefined && to != null) {
        option.from = {}
        option.to = {}
        option.from.$gte = from
        option.to.$lte = to
    }
    return option
}

module.exports = {
    BookingsServer
}