"use strict"

var Promise = require("core-js").Promise

// RoomsService represents tha service layer for rooms.
class RoomsService{
    constructor(
        RoomsRepository,
        HotelsRepository,
        BookingsRepository,
    ) {
        this.HotelsRepository = HotelsRepository
        this.BookingsRepository = BookingsRepository
        this.RoomsRepository = RoomsRepository
    }
}

// find a room.
RoomsService.prototype.Find = function(filterOptions, otherOptions, projection) {
    let rooms = this.RoomsRepository
    let roomFilters = filterOptions
    let roomOthers = otherOptions
    let noRooms = this.UnAvailableRooms(roomFilters, roomOthers)

    return new Promise(function(resolve, reject){
        if (roomOthers != undefined && roomOthers.available) {
            noRooms.then(function(data){
                var ninOptions = { id : {$nin : data}}
                rooms.Find(
                    roomFilters, 
                    ninOptions,
                ).then(function(data){
                    resolve(data)
                }).catch(function(err){
                    reject(err)
                })
            }).catch(function(err){
                reject(err)
            })
        } else {
            rooms.Find(
                roomFilters, 
            ).then(function(data){
                resolve(data)
            }).catch(function(err){
                reject(err)
            })
        }
    })
}

// Create a room.
RoomsService.prototype.Create = function(room) {
    let rooms = this.RoomsRepository
    let hotels = this.HotelsRepository
    return new Promise(function(resolve, reject){
        hotels.Find(
            {id: room.hotel_id}
        ).then(function(data){
            if (data.length > 0){
                rooms.Save(
                    room
                ).then(function(data){
                    resolve(data)
                }).catch(function(err){
                    reject(err)
                })
            } else{
                reject("specified hotel doesn't exist")
            }
        }).catch(function(err){
            reject(err)
        })
        
    })
}

// Update a room.
RoomsService.prototype.Update = function(room) {
    let rooms = this.RoomsRepository
    return new Promise(function(resolve, reject){
        rooms.Update(
            room
        ).then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}

// Delete a room.
RoomsService.prototype.Delete = function(room) {
    let rooms = this.RoomsRepository
    return new Promise(function(resolve, reject){
        rooms.Delete(
            room
        ).then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}

// Helper method to find unAvailable / booked rooms.
RoomsService.prototype.UnAvailableRooms = function(filters, others) {
    var bookingFilterOption = {}
    if (others.from && others.to) {
        bookingFilterOption.from = others.from
        bookingFilterOption.to = others.to
    }
    if (filters.hotel_id) {
        bookingFilterOption.hotel_id = filters.hotel_id
    }
    var bookingProjectionOptions = {
        room_id: 1,
    }

    let bookings = this.BookingsRepository

    return new Promise(function(resolve, reject){
        bookings.Find(
            bookingFilterOption, 
            bookingProjectionOptions,
        ).then(function(data){
            // console.log("booking data", data)
            var roomIds = []
            data.forEach(element => {
                if (element.room_id) {
                    roomIds.push(element.room_id)
                }
            });
            
            // console.log("rooms data", roomIds)
            resolve(roomIds)
        }).catch(function(err){
            reject(err)
        })
    })
    
}

module.exports = {
    RoomsService
}