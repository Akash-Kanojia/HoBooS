"use strict"

const hotelCollectionName = "hotels"

// HotelsRepository represents the underlying implementation of persistence layer for
// Hotels collection.
class HotelsRepository{
    constructor(db) {
        this.db = db
    }
}

// Find hotels.
HotelsRepository.prototype.Find = function(filterOptions) {
    db = this.db
    filters = filterOptions
    return new Promise(function(resolve, reject){
        db.collection(hotelCollectionName).find(
            filters,
        ).toArray().then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}

// Save a hotel.
HotelsRepository.prototype.Save = function(hotel) {
    db = this.db
    return new Promise(function(resolve, reject){
        db.collection(hotelCollectionName).insertOne(
            hotel,
        ).then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}

// Delete a hotel.
HotelsRepository.prototype.Delete = function(hotel) {
    db = this.db
    return new Promise(function(resolve, reject){
        db.collection(hotelCollectionName).deleteOne(
            {id : hotel.id},
        ).then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}

// Update a hotel.
HotelsRepository.prototype.Update = function(hotel) {
    db = this.db
    return new Promise(function(resolve, reject){
        db.collection(hotelCollectionName).updateOne(
            {id : hotel.id},
            {$set: hotel},
        ).then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}

module.exports = {
    HotelsRepository
}