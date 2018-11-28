"use strict"

const usersCollectionName = "users"

// UsersRepository represents the underlying implementation of persistence layer for
// Users collection.
class UsersRepository{
    constructor(db) {
        this.db = db
    }
}

// Find a user.
UsersRepository.prototype.Find = function(filterOptions) {
    let db = this.db
    let filters = filterOptions 
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

// Save a User.
UsersRepository.prototype.Save = function(user) {
    let db = this.db
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

// Delete a user
UsersRepository.prototype.Delete = function(user) {
    let db = this.db
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

// Update a user
UsersRepository.prototype.Update = function(user) {
    let db = this.db
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