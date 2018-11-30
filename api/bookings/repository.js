"use strict"

const bookingsCollectionName = "bookings"

// BookingsRepository represents an underlying implementation of persistence layer. 
// For booking collection.
class BookingsRepository{
    constructor(db) {
        this.db = db
    }
}

// Find the bookings.
BookingsRepository.prototype.Find = function(filterOptions, projectionOptions) {
    let db = this.db
    let filters = filterOptions
    let projections = projectionOptions
    return new Promise(function(resolve, reject){
        db.collection(bookingsCollectionName).aggregate(
            [
                { $lookup:
                    {
                      from: 'hotels',
                      localField: 'hotel_id',
                      foreignField: 'id',
                      as: 'hotel_details'
                    }
                },
                {   
                    $lookup: {
                      from: 'rooms',
                      localField: 'room_id',
                      foreignField: 'id',
                      as: 'room_details'
                    }
                },
                { 
                    $match: filters
                },
            ]
        ).toArray().then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}

// Save bookings.
BookingsRepository.prototype.Save = function(booking) {
    let db = this.db
    return new Promise(function(resolve, reject){
        db.collection(bookingsCollectionName).insertOne(
            booking,
        ).then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}

// Delete booking.
BookingsRepository.prototype.Delete = function(booking) {
    let db = this.db
    return new Promise(function(resolve, reject){
        db.collection(bookingsCollectionName).deleteOne(
            {id : booking.id},
        ).then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}

// Update booking.
BookingsRepository.prototype.Update = function(booking) {
    let db = this.db
    return new Promise(function(resolve, reject){
        db.collection(bookingsCollectionName).updateOne(
            {id : booking.id},
            {$set: booking},
        ).then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}

module.exports = {
    BookingsRepository,
}