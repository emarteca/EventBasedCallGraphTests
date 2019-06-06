var net = require('net');

var server = net.createServer(function (client) {
    var id = client.remoteAddress + ':' + client.remotePort;
        client.on('connect', function() {
        channel.emit('join', id, client);
    });
    client.on('data', function(data) {
        data = data.toString();
        channel.emit('broadcast', id, data);
    });
});