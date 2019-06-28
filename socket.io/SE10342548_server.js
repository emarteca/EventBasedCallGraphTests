//(function () {
var app, count, express, io, http;

// edits required since express.createServer() is deprecated
// commented out all the app code since it wasn't working, and changed app to 
// point to an http server
// this is only required for the code to be analyzed, and the actual bug is only in the 
// socket.io code so this should have no effect on the results 

express = require('express');
io = require('socket.io');
http = require('http');


app = module.exports = express(); // express.createServer();
app = http.createServer(app);

// app.configure(function () {
//     app.set('views', __dirname + '/views');
//     app.set('view engine', 'jade');
//     app.use(express.bodyParser());
//     app.use(express.methodOverride());
//     app.use(require('stylus').middleware({
//         src: __dirname + '/public'
//     }));
//     app.use(app.router);
//     return app.use(express.static(__dirname + '/public'));
// });

// app.configure('development', function () {
//     return app.use(express.errorHandler({
//         dumpExceptions: true,
//         showStack: true
//     }));
// });
// app.configure('production', function () {
//     return app.use(express.errorHandler());
// });

io = require('socket.io').listen(app);

count = 0;

io.sockets.on('connection', function (socket) {
    count++;
    io.sockets.emit('count', {
        number: count
    });
});

io.sockets.on('disconnect', function () {
    console.log('DISCONNESSO!!! ');
    count--;
    io.sockets.emit('count', {
        number: count
    });
});


// app.get('/', function (req, res) {
//     return res.render('index', {
//         title: 'node.js express socket.io counter'
//     });
// });
if (!module.parent) {
    app.listen(10927);
    console.log("Express server listening on port %d", app.address().port);
}

//}).call(this);