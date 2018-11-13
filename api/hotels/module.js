"use stricts"

var HotelsServer = require("./server.js").HotelsServer
var HotelsService = require("./service.js").HotelsService
var HotelsRepository = require("./repository.js").HotelsRepository
var Hotel = require("./hotel.js").Hotel


module.exports = {
    HotelsServer,
    HotelsService,
    HotelsRepository,
    Hotel
}