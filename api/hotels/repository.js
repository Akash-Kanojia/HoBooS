"use stricts"

const hotelCollectionName = "hotels"

class HotelsRepository{
    constructor(db) {
        this.db = db
    }
}

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