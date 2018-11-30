var express = require("express")
var cors = require('cors');
var process = require("process")
var bodyParser = require('body-parser')
var db = require("./mongodb.js");
var usersModule = require("./api/users/module.js")
var hotelsModule = require("./api/hotels/module.js")
var roomsModule = require("./api/rooms/module.js")
var bookingsModule = require("./api/bookings/module.js")
var authModule = require("./api/users/auth/module.js")

var app = express();
var authService
var routeNeedsUserAuth = [
    hotelsModule.Server.Routes.hotels,
    roomsModule.Server.Routes.rooms,
    bookingsModule.Server.Routes.bookings,
]

var routeNeedsAdminAuth = [
    hotelsModule.Server.Routes.hotels,
    hotelsModule.Server.Routes.hotelById,
    roomsModule.Server.Routes.rooms,
    roomsModule.Server.Routes.roomById,
    bookingsModule.Server.Routes.bookings,
    bookingsModule.Server.Routes.bookingByID,
    usersModule.Server.Routes.users,
    usersModule.Server.Routes.userByEmail,
]

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

    authService = new authModule.AuthService()

    // Initialize servers.
    var bookingServer = new bookingsModule.Server.BookingsServer(bookingService)
    var roomServer = new roomsModule.Server.RoomsServer(roomService)
    var hotelServer = new hotelsModule.Server.HotelsServer(hotelService)
    var userServer = new usersModule.Server.UsersServer(userService)
    var authServer = new authModule.Server.AuthServer(userService, authService)

    bookingServer.Invoke(app)
    roomServer.Invoke(app)
    hotelServer.Invoke(app)
    userServer.Invoke(app)
    authServer.Invoke(app)
    
}).catch(function(err){
    console.log("error in connecting database ", err)
})

app.use(cors({
    origin: 'http://localhost:3000'
}));

// Middleware Auth.
app.use(function (req, res, next) { 
    if (routeNeedsUserAuth.includes(req.url)) {  
        let userToken = req.get("hoboos-secret")
        authService.Authenticate(
            userToken,
        ).then(function(data){
            req.User = data
            next()
        }).catch(function(err) {
            if (err != undefined) {
                res.status(400).send("Access Denied")
            } else {
                next()
            }
        })
    } else if (routeNeedsAdminAuth.includes(req.url)) {
        // TODO: Auth for admin.
    } else {
        next()
    }
})

var server = app.listen(process.env.PORT, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})