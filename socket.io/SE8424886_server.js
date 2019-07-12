var app = require('express')();
app.listen(3000);

 // socket.io setup
 var socket = require('socket.io').listen(app);

 // socket.io connection establishment
 socket.on('connection', function (client) {
    client.send("hello");
    console.log("hello", client);           
 });