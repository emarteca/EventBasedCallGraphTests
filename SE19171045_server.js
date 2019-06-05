var https = require('https'),
server = https.createServer(options, app);

//have socket.io listen to the same https port.
var io = require('socket.io'); //(server);

io.sockets.on('connection', function(socket) {
    console.log("connection");

    io.sockets.on('connect', function(socket) {
        console.log("connect");
     });
});