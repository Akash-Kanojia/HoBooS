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
    let bookings = this.BookingsRepository
    let filters = filterOptions
    let projections = projectionOptions

    return new Promise(function(resolve, reject){
        bookings.Find(
            filters,
            projections,
        ).then(function(bookings){
            bookings.map(booking => {
                booking.from = new Date(booking.from).toLocaleString('en-US', { timeZone: 'UTC' })
                booking.to = new Date(booking.to).toLocaleString('en-US', { timeZone: 'UTC' })
            })
            resolve(bookings)
        }).catch(function(err){
            reject(err)
        })
    })
}

// Create bookings
BookingsService.prototype.Create = function(booking) {
    let bookings = this.BookingsRepository
    let rooms = this.RoomsRepository
    let users = this.UsersRepository
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
    let bookings = this.BookingsRepository
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
    let bookings = this.BookingsRepository
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