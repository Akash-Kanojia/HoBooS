"use stricts"

const usersCollectionName = "users"

class UsersRepository{
    constructor(db) {
        this.db = db
    }
}

UsersRepository.prototype.Find = function(filterOptions) {
    db = this.db
    filters = filterOptions 
    return new Promise(function(resolve, reject){
        db.collection(usersCollectionName).find(
            filters,
        ).toArray().then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}

UsersRepository.prototype.Save = function(user) {
    db = this.db
    return new Promise(function(resolve, reject){
        db.collection(usersCollectionName).insertOne(
            user,
        ).then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}

UsersRepository.prototype.Delete = function(user) {
    db = this.db
    return new Promise(function(resolve, reject){
        db.collection(usersCollectionName).deleteOne(
            {email : user.email},
        ).then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}

UsersRepository.prototype.Update = function(user) {
    db = this.db
    return new Promise(function(resolve, reject){
        db.collection(usersCollectionName).updateOne(
            {email : user.email},
            {$set: user},
        ).then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}


module.exports = {
    UsersRepository,
}