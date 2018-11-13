"use stricts"

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
    db = this.db
    filters = filterOptions
    projections = projectionOptions
    return new Promise(function(resolve, reject){
        db.collection(bookingsCollectionName).find(
            filters,
            {projection : projections}
        ).toArray().then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}

// Save bookings.
BookingsRepository.prototype.Save = function(booking) {
    db = this.db
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
    db = this.db
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
    db = this.db
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