"use strict"

const roomCollectionName = "rooms"

// RoomsRepository represents the underlying implementation of persistence layer for
// Rooms collection.
class RoomsRepository{
    constructor(db) {
        this.db = db
    }
}

// Find a room.
RoomsRepository.prototype.Find = function(filterOptions, otherOptions) {
    let db = this.db
    let filters = filterOptions
    let others = otherOptions
    return new Promise(function(resolve, reject){
        console.log("find rooms", {...filters, ...others});
        
        db.collection(roomCollectionName).find(
            {...filters, ...others},
        ).toArray().then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}

// Save a room.
RoomsRepository.prototype.Save = function(room) {
    let db = this.db
    return new Promise(function(resolve, reject){
        db.collection(roomCollectionName).insertOne(
            room,
        ).then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}

// Delete a room.
RoomsRepository.prototype.Delete = function(room) {
    let db = this.db
    return new Promise(function(resolve, reject){
        db.collection(roomCollectionName).deleteOne(
            {id : room.id},
        ).then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}

// Update a room.
RoomsRepository.prototype.Update = function(room) {
    let db = this.db
    return new Promise(function(resolve, reject){
        db.collection(roomCollectionName).updateOne(
            {id : room.id},
            {$set: room},
        ).then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}

module.exports = {
    RoomsRepository
}