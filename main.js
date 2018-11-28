var express = require("express")
var process = require("process")
var bodyParser = require('body-parser')
var db = require("./mongodb.js");
var usersModule = require("./api/users/module.js")
var hotelsModule = require("./api/hotels/module.js")
var roomsModule = require("./api/rooms/module.js")
var bookingsModule = require("./api/bookings/module.js")
var authModule = require("./api/users/auth/module.js")

var app = express();
app.use(bodyParser.json());

db.Connect().then(function(db){
    console.log("intiating services")

    // Initilize repositories.
    var bookingsRepository = new bookingsModule.BookingsRepository(db)
    var usersRepository = new usersModule.UsersRepository(db)
    var hotelsRepository = new hotelsModule.HotelsRepository(db)
    var roomsRepository = new roomsModule.RoomsRepository(db)

    // Initilize services.
    var hotelService = new hotelsModule.HotelsService(
        hotelsRepository, 
        roomsRepository,
    )
    var bookingService = new bookingsModule.BookingsService(
        bookingsRepository, 
        roomsRepository, 
        usersRepository,
    )
    var roomService = new roomsModule.RoomsService(
        roomsRepository, 
        hotelsRepository, 
        bookingsRepository,
    )
    var userService = new usersModule.UsersService(usersRepository)

    // Initialize servers.
    var bookingServer = new bookingsModule.BookingsServer(bookingService)
    var roomServer = new roomsModule.RoomsServer(roomService)
    var hotelServer = new hotelsModule.HotelsServer(hotelService)
    var userServer = new usersModule.UsersServer(userService)
    var authServer = new authModule.AuthServer(userService)

    bookingServer.Invoke(app)
    roomServer.Invoke(app)
    hotelServer.Invoke(app)
    userServer.Invoke(app)
    authServer.Invoke(app)
    
}).catch(function(err){
    console.log("error in connecting database ", err)
})


var server = app.listen(process.env.PORT, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})