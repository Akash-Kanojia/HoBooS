"use strict"

var Room = require("./room.js").Room
var Promise = require("core-js").Promise

// Routes
var Routes = {
    rooms: "/rooms",
    roomById: "/rooms/:id"
}

// RoomsServer serve and listen thes room's rest api.
class RoomsServer{
    constructor(RoomsService){
        this.RoomsService = RoomsService
    }
}

// Invokes the server.
RoomsServer.prototype.Invoke = function(app) {
    let RoomsService = this.RoomsService
   
    // Create room for hotel.
    app.post(Routes.rooms, function (req, res) {
        var hotel_id = req.get("hotel_id")
        var roomReq = JSON.parse(JSON.stringify(req.body))
        var room = new Room(
            null,
            roomReq.no,
            hotel_id,
            roomReq.type
        )
        RoomsService.Create(
            room,
        ).then(function(data){
            res.send(room);
        }).catch(function(err){
            console.log("error in creating room for hotel, ", err);
            res.send(("error in creating room for hotel").concat(err))
        })
     })

     // Find rooms.
    app.get(Routes.rooms, function (req, res) {
        var filters = roomsFilterOptions(req)
        var others = roomsOtherOptions(req)        
        RoomsService.Find(
            filters,
            others,
        ).then(function(data){
            res.send(data);
        }).catch(function(err){
            console.log("error in fetching rooms, ", err)
            res.send("error in fetching rooms");
        })
    })

    // Update room details.
    app.put(Routes.roomById, function(req, res) {
        // TODO: update rooms with limitations.
        res.send("can't update room details at the moment")
    })

    // Delete room from hotel.
    app.delete(Routes.roomById, function(req, res) {
        // TODO: delete rooms with a valid usecase.
        res.send("can't delete room at the moment")
    })
}


// Helper method to create findOptions object from request
function roomsFilterOptions(req) {
    var hotel_id = req.get("hotel_id")
    var id = req.get("id")

    var option = {}
    if (hotel_id != undefined && hotel_id != null) {
        option.hotel_id = hotel_id
    }
    if (id != undefined && id != null) {
        option.id = id
    }
   
    return option
}

// Helper method to create otherOptions object from request
function roomsOtherOptions(req) {
    var available = req.get("available")
    var from = req.get("from")
    var to = req.get("to") 

    var option = {}
    if (available != undefined && available != null) {
        option.available = available
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
    RoomsServer,
    Routes
}