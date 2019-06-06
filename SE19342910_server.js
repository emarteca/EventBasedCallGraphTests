var net = require('net');

var server = net.createServer(function (socket) {

    socket.on('connect', function() {
        console.log("New client!");
    });

});

server.listen(8000, function(){
    console.log("server running...")
});