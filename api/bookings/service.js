"use strict"

var Promise = require("core-js").Promise

// BookingsService represents the service layer for bookings
class BookingsService {
    constructor(BookingsRepository, RoomsRepository, UsersRepository) {
        this.RoomsRepository = RoomsRepository
        this.BookingsRepository = BookingsRepository
        this.UsersRepository = UsersRepository
    }
}

// Find bookings as per findOption.
BookingsService.prototype.Find = function(filterOptions, projectionOptions) {
    bookings = this.BookingsRepository
    filters = filterOptions
    projections = projectionOptions

    return new Promise(function(resolve, reject){
        bookings.Find(
            filters,
            projections,
        ).then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}

// Create bookings
BookingsService.prototype.Create = function(booking) {
    bookings = this.BookingsRepository
    rooms = this.RoomsRepository
    users = this.UsersRepository
    return new Promise(function(resolve, reject){
        users.Find(
            {email: booking.user_email}
        ).then(function(data){
            if (data.length > 0) {
                rooms.Find(
                    {id: booking.room_id}
                ).then(function(data){
                    if (data.length > 0) {
                        bookings.Save(
                            booking
                        ).then(function(data){
                            resolve(data)
                        }).catch(function(err){
                            reject(err)
                        })
                    } else {
                        reject("specified room doesn't exists")
                    }  
                }).catch(function(err){
                    reject(err)
                })
            } else {
                reject("specified user doesn't exists")
            }  
        }).catch(function(err){
            reject(err)
        })
        
    })
}

// Update bookings
BookingsService.prototype.Update = function(booking) {
    bookings = this.BookingsRepository
    return new Promise(function(resolve, reject){
        bookings.Update(
            booking
        ).then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}

// Delete bookings
BookingsService.prototype.Delete = function(booking) {
    bookings = this.BookingsRepository
    return new Promise(function(resolve, reject){
        bookings.Delete(
            booking
        ).then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}

module.exports = {
    BookingsService,
}