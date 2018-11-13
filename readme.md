# hoboos - hotel booking system.

This is a simple server side implementation for hotel booking system. This is an api server that provides REST API to perform CRUD operations on hotel bookings.

This api server uses uses `MongoDB` for data persistence and `express` for http requests handling.

## Ubiquitous language.

- A `Room` represents an entity that can be booked for an accomodation by an user.
- A `Hotel` has many rooms.
- `Booking` belongs to a room

## Requirements

- node version `v10.11.0` or higher.

- [MongoDB on your local machine](https://docs.mongodb.com/manual/installation/)


## Build and run


- Run the following command in root directory of repository.
```
npm install
node main.js
```

- Now before running the application make sure that MongoDB is in running state and ready to accept connection, note down the `url` for the same.
- Specify the PORT at which you want server to listen (optional).
- Run the following command in root directory of repository.
```
MONGO_DB_URL="mongodb://127.0.0.1:27017"  PORT="8090" node main.js
```



## Usage
Once application goes in running state api's can be hit on `http://localhost:8090`

### Following are the APIs

#### User Signup

|Method|Url|
|---|---|
|**POST**|`http://localhost:8090/users`|

Body 
```
{
    "email": "akash@hoboos.com",
    "name": "akash"
}
```
Response

```
{
    "email":"akash@todo.com",
    "Name":"akash",
    ...
}
```

#### Create a hotel
Returns the `hotel` entity.

|Method|Url|
|---|---|
|**POST**|`http://localhost:8090/hotels`|


Body
```
{
    "name": "st.regis",
	"location": "mumbai",
	"type": "bussiness hotel"
}
```

Response
```
{
    "id": "f6a6438d-aa27-4637-890f-6c9dd542ff8d",
    "name": "st.regis",
    "location": "mumbai",
    "type": "bussiness hotel",
    "_id": "5bea3369d3943510371c8577"
}
```
#### List all hotels
Returns an array of `hotels` in response .
|Method|Url|
|---|---|
|**GET**|`http://localhost:8090/hotels`|

Response
```
[
  {
    "id": "f6a6438d-aa27-4637-890f-6c9dd542ff8d",
    "name": "st.regis",
    "location": "mumbai",
    "type": "bussiness hotel",
    "_id": "5bea3369d3943510371c8577"
  }
]
```

#### Similarly...

|Method|Url|description|
|---|---|---|
|**PUT**|`http://localhost:8090/hotels`|Updates a hotel - body must contain the `id` of existing hotel to be updated|
|**DELETE**|`http://localhost:8090/hotels/:id`|delete a hotel by `id`|

#### Create a Room
Returns the `room` entity. To create a room hotel must exist.

|Method|Url|
|---|---|
|**POST**|`http://localhost:8090/rooms`|


Header

`hotel_id` must be an existing hotel id otherwise error is thrown.

|key|value|
|---|---|
|hotel_id|e6cc35cf-4e6c-4aab-ac24-ef9a7dab35da|


Body
```
{
	"no": "308",
	"type": "double-bed"
}
```

Response
```
{
    "id": "2e832f9b-6861-4272-b104-39aa465f2b3e",
    "no": "308",
    "hotel_id": "f6a6438d-aa27-4637-890f-6c9dd542ff8d",
    "type": "double-bed",
    "_id": "5bea38121ec0ce106728d149"
}
```

#### Find  Rooms
Returns the array of `room` entity..

|Method|Url|
|---|---|
|**GET**|`http://localhost:8090/rooms`|


Header
Given a filter based on range of date and availability all rooms are fetched excluding the
ones which exists in bookings for same range of date.
To see all rooms don't give any headers.

|key|value|
|---|---|
|available|true|
|from| `11-11-2018` | 
|to| `18-11-2018` |


Response
```
[  
    {
        "_id": "5bea20b8e6bcc40f198a7589",
        "id": "58441195-7b41-4675-a9bc-ad648cbe9eae",
        "no": "308",
        "hotel_id": f6a6438d-aa27-4637-890f-6c9dd542ff8d,
        "type": "single-bed"
    },
    {
        "_id": "5bea38121ec0ce106728d149",
        "id": "2e832f9b-6861-4272-b104-39aa465f2b3e",
        "no": "308",
        "hotel_id": "f6a6438d-aa27-4637-890f-6c9dd542ff8d",
        "type": "double-bed"
    }
]
```

#### Create  Bookings
Returns the `booking` entity..

|Method|Url|
|---|---|
|**POST**|`http://localhost:8090/bookings`|


Header
Given a filter based on range of date and availability all rooms are fetched excluding the
ones which exists in bookings for same range of date.
To see all rooms don't give any headers.

|key|value|
|---|---|
|user_email|`akash@hoboos.com`|
|hotel_id| `f6a6438d-aa27-4637-890f-6c9dd542ff8d` | 
|room_id| `2e832f9b-6861-4272-b104-39aa465f2b3e` |

Body
```
{
	"from": "15-11-2018",
	"to": "16-11-2018",
	"no_of_people": 2
}
```

Response
```
{
    "id": "9bd03379-c9aa-42e6-b6b7-f09dd90a0fb8",
    "user_email": "akash@hoboos.com",
    "hotel_id": "f6a6438d-aa27-4637-890f-6c9dd542ff8d",
    "room_id": "2e832f9b-6861-4272-b104-39aa465f2b3e",
    "from": "15-11-2018",
    "to": "16-11-2018",
    "no_of_people": 2,
    "_id": "5bea3e1596253a107d933d36"
}
```

#### Find  Bookings
Returns the array `booking` entity..

|Method|Url|
|---|---|
|**GET**|`http://localhost:8090/bookings`|


Header
Given a filter based on range of date and availability all bookings are fetched.
bookings can be filtered by hotel_id, user_email, room_id also
To see all bookings don't give any headers.

|key|value|
|---|---|
|user_email|`akash@hoboos.com`|
|hotel_id| `f6a6438d-aa27-4637-890f-6c9dd542ff8d` | 
|room_id| `2e832f9b-6861-4272-b104-39aa465f2b3e` |
|from| `13-11-2018` | 
|to| `17-11-2018` |

Given this <key,value> results
|key|value|
|---|---|
|user_email|`akash@hoboos.com`|
|from| `13-11-2018` | 
|to| `17-11-2018` |


Response
```
[
    {
        "_id": "5bea3e1596253a107d933d36",
        "id": "9bd03379-c9aa-42e6-b6b7-f09dd90a0fb8",
        "user_email": "akash@hoboos.com",
        "hotel_id": "f6a6438d-aa27-4637-890f-6c9dd542ff8d",
        "room_id": "2e832f9b-6861-4272-b104-39aa465f2b3e",
        "from": "15-11-2018",
        "to": "16-11-2018",
        "no_of_people": 2
    }
]
```


