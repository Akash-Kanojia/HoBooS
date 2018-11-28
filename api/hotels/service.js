"use strict"

// HotelsService represents the service layer for hotel.
class HotelsService{
    constructor(HotelsRepository, RoomsRepository) {
        this.HotelsRepository = HotelsRepository
        this.RoomsRepository = RoomsRepository
    }
}

// Find a hotel.
HotelsService.prototype.Find = function(filterOptions) {
    let repository = this.HotelsRepository
    let filters = filterOptions

    return new Promise(function(resolve, reject){
        repository.Find(
            filters,
        ).then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}

// Create a hotel.
HotelsService.prototype.Create = function(hotel) {
    let repository = this.HotelsRepository
    return new Promise(function(resolve, reject){
        repository.Save(
            hotel
        ).then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}

// Update a hotel.
HotelsService.prototype.Update = function(hotel) {
    let repository = this.HotelsRepository
    return new Promise(function(resolve, reject){
        repository.Update(
            hotel
        ).then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}

// Delete a hotel.
HotelsService.prototype.Delete = function(hotel) {
    let repository = this.HotelsRepository
    return new Promise(function(resolve, reject){
        repository.Delete(
            hotel
        ).then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}

module.exports = {
    HotelsService
}