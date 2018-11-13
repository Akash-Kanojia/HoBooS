"use stricts"

const roomCollectionName = "rooms"

class RoomsRepository{
    constructor(db) {
        this.db = db
    }
}

RoomsRepository.prototype.Find = function(filterOptions, otherOptions) {
    db = this.db
    filters = filterOptions
    others = otherOptions
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

RoomsRepository.prototype.Save = function(room) {
    db = this.db
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

RoomsRepository.prototype.Delete = function(room) {
    db = this.db
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

RoomsRepository.prototype.Update = function(room) {
    db = this.db
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