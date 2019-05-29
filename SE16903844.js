// stack overflow https://stackoverflow.com/questions/16903844/node-js-net-events-dont-fire
// from reading the solution, it seems the issue is that there should not be client.on('connect'),
// this extra listener causes the join to never be called

// i'm not sure yet how to classify this error 

var events = require('events');
    var net = require('net');
    var channel = new events.EventEmitter();
    channel.clients = {};
    channel.subscriptions = {};
    channel.on('join', function (id, client) {
        this.clients[id] = client;
        this.subscriptions[id] = function (senderId, message) {
            if (id != senderId) {
                this.clients[id].write(message);
            }
        }
        this.on('broadcast', this.subscriptions[id]);
    });
    var server = net.createServer(function (client) {
        var id = client.remoteAddress + ':' + client.remotePort;
        console.log(id);
        client.on('connect', function () {
            console.log('A new connection was made');
            channel.emit('join', id, client);
        });
        client.on('data', function (data) {
            data = data.toString();
            channel.emit('broadcast', id, data);
        });
    });

    server.listen(8888);