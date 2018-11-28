"use strict"

var Hotel = require("./hotel.js").Hotel

// Routes
var Routes = {
    hotels: "/hotels",
    hotelById: "/hotels/:id"    
}

// HotelsServer serve and listen thes hotel's rest api.
class HotelsServer{
    constructor(HotelsService){
        this.HotelsService = HotelsService
    }
}

HotelsServer.prototype.Invoke = function(app) {
   let service = this.HotelsService
   
    // Create hotels.
    app.post(Routes.hotels, function (req, res) {
        var hotelReq = JSON.parse(JSON.stringify(req.body))
        var hotel = new Hotel(
            null,
            hotelReq.name,
            hotelReq.location,
            hotelReq.type,
            hotelReq.rooms,
        )
        service.Create(
            hotel,
        ).then(function(data){
            res.send(hotel);
        }).catch(function(err){
            console.log("error in creating hotel, ", err);
            res.send("error in creating hotel")
        })
     })

     // Find hotels.
    app.get(Routes.hotels, function (req, res) {
        var filter = hotelsFilterOptions(req)
        
        service.Find(
            filter,
        ).then(function(data){
            res.send(data);
        }).catch(function(err){
            console.log("error in fetching hotels, ", err)
            res.send("error in fetching hotels");
        })
    })

    // Update hotel.
    app.put(Routes.hotelById, function(req, res) {
        id = req.params.id
        var hotelReq = JSON.parse(JSON.stringify(req.body))
        var hotel = new Hotel(
            id,
            hotelReq.name,
            hotelReq.location,
            hotelReq.type,
            hotelReq.rooms,
        )
        service.Update(
            hotel 
        ).then(function(data){
            res.send(hotel);
        }).catch(function(err){
            console.log("error in updating hotel, ", err);
            res.send("error in updating hotel")
        })
    })

    // Delete hotel.
    app.delete(Routes.hotelById, function(req, res) {
        id = req.params.id
        service.Delete(
            new Hotel(id),
        ).then(function(data){
            res.send("successfully deleted");
        }).catch(function(err){
            console.log("error in deleting hotel, ", err);
            res.send("error in deleting hotel")
        })
    })
}

// Helper method to create options object from request
function hotelsFilterOptions(req) {
    var id = req.get("id")
    var type = req.get("type")    

    var option = {}

    if (type != undefined && type != null) {
        option.type = type
    }
    if (id != undefined && id != null) {
        option.id = id
    }
    
    return option
}

module.exports = {
    HotelsServer,
    Routes
}