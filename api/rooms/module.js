"use strict"

var RoomsServer = require("./server.js").RoomsServer
var RoomsService = require("./service.js").RoomsService
var RoomsRepository = require("./repository.js").RoomsRepository
var Room = require("./room.js").Room


module.exports = {
    RoomsServer,
    RoomsService,
    RoomsRepository,
    Room
}