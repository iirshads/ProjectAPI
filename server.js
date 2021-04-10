var express = require('express');
var cors = require('cors')
var app = express()

app.use(cors())


var port = process.env.port || 1337;
var bodyParser = require('body-parser');

console.log("APP")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var eventController = require('./Controller/EventController')();

app.use("/api/events", eventController);


app.listen(port, function () {
    var datetime = new Date();
    var message = "Server runnning on Port:- " + port + "Started at :- " + datetime;
    console.log(message);
});

