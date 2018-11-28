"use strict"

var Server = require("./server.js")
var HotelsService = require("./service.js").HotelsService
var HotelsRepository = require("./repository.js").HotelsRepository
var Hotel = require("./hotel.js").Hotel


module.exports = {
    Server,
    HotelsService,
    HotelsRepository,
    Hotel
}