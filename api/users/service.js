"use stricts"

class UsersService{
    constructor(UsersRepository) {
        this.UsersRepository = UsersRepository
    }
}

UsersService.prototype.Find = function(filterOptions) {
    repository = this.UsersRepository
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

UsersService.prototype.Create = function(user) {
    repository = this.UsersRepository
    return new Promise(function(resolve, reject){
        repository.Find(
            {email: user.email},
        ).then(function(data){
            if (data.length == 0) {
                repository.Save(
                    user,
                ).then(function(data){
                    resolve(data)
                }).catch(function(err){
                    reject(err)
                })
            } else {
                reject("user already exists")
            }
        }).catch(function(err){
            reject(err)
        })

       
    })
}

UsersService.prototype.Update = function(user) {
    repository = this.UsersRepository
    return new Promise(function(resolve, reject){
        repository.Update(
            user
        ).then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}

UsersService.prototype.Delete = function(user) {
    repository = this.UsersRepository
    return new Promise(function(resolve, reject){
        repository.Delete(
            user
        ).then(function(data){
            resolve(data)
        }).catch(function(err){
            reject(err)
        })
    })
}

module.exports = {
    UsersService
}