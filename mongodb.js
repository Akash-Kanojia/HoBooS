var Promise = require("core-js").Promise
var process = require("process")
var MongoClient = require('mongodb').MongoClient;

const DatabaseName = "hoboos"

function Connect(){
    return new Promise(function(resolve, reject){
        MongoClient.connect(
            process.env.MONGO_DB_URL,
        ).then(function(db){
            resolve(db.db(DatabaseName))
        }).catch(function(err){
            reject(err)
        })
    })
}

module.exports = {
    Connect
}