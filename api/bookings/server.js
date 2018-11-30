"use strict"

var Booking = require("./booking.js").Booking
var Promise = require("core-js").Promise

// Routes.

var Routes = {
    bookings: "/bookings",
    bookingByID:"/bookings/:id"
}

// BookingsServer serve and listen thes booking's rest api.
class BookingsServer{
    constructor(BookingsService){
        this.BookingsService = BookingsService
    }
}

// Invokes the booking server.
BookingsServer.prototype.Invoke = function(app) {
   let BookingsService = this.BookingsService
   
    // Create booking.
    app.post(Routes.bookings, function (req, res) {
        var hotel_id = req.get("hotel_id")
        var room_id = req.get("room_id")
        var bookingReq = JSON.parse(JSON.stringify(req.body))
        var booking = new Booking(
            null,
            req.User,
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
    app.get(Routes.bookings, function (req, res) {
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
    app.put(Routes.bookingByID, function(req, res) {
        // TODO: update bookings with limitations.
        res.send("can't update bookings at the moment")
    })

    // Delete bookings.
    app.delete(Routes.bookingByID, function(req, res) {
        // TODO: delete bookings with a valid usecase.
        res.send("can't delete bookings at the moment")
    })
}

// Helper method to create options object from request
function filterOptions(req) {
    var hotel_id = req.get("hotel_id")
    var room_id = req.get("room_id")
    var from = req.get("from")
    var to = req.get("to")    

    var option = {}
    if (req.User != undefined && req.User != null) {
        option.user_email = req.User
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
        option.from.$gte = new Date(from).toISOString()
        option.to.$lte = new Date(to).toISOString()
    }
    return option
}

module.exports = {
    BookingsServer,
    Routes
}