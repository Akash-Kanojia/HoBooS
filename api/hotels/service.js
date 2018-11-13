"use stricts"

class HotelsService{
    constructor(HotelsRepository, RoomsRepository) {
        this.HotelsRepository = HotelsRepository
        this.RoomsRepository = RoomsRepository
    }
}

HotelsService.prototype.Find = function(filterOptions) {
    repository = this.HotelsRepository
    filters = filterOptions

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

HotelsService.prototype.Create = function(hotel) {
    repository = this.HotelsRepository
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

HotelsService.prototype.Update = function(hotel) {
    repository = this.HotelsRepository
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

HotelsService.prototype.Delete = function(hotel) {
    repository = this.HotelsRepository
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