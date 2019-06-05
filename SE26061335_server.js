var app = require('express')(),
https = require('https'),
fs = require('fs'),
routes = require('./mod/routes'),
socketRoutes = require('./mod/socket/routes'),
sockets = require('./mod/socket/sockets'),
config = require('./mod/config'),
socketArray = {},
options = {
    key: fs.readFileSync('4096_SSL.key').toString(),
    cert: fs.readFileSync('wild.crt').toString(),
    ca: fs.readFileSync('gd_bundle.crt').toString()
},
server = https.createServer(options, app);

app.use(require('body-parser').urlencoded({
    extended: true
}));

/****************
 * Basic Routes *
 ****************/
app.all('*', routes.setAccessControl);

app.get('/', routes.base);

/*--- Server Side Post Routes ---*/
app.post('/notify/:type', routes.notify);

app.get('/employees/:masterid', routes.employees);

//404 page that doesn't trigger error handling in ajax calls
app.use(routes.fallback);

//start listening on alternate https port
server.listen(7076);

//have socket.io listen to the same https port.
var io = require('socket.io')(server);

/*****************
 * Socket Events *
 *****************/

io.on('connection', function(socket) {
    io.sockets.emit('message', {
        message: 'New user Connected'
    });
    socket.emit('connected', {
        success: 1
    });
});


io.on('join', function(socket) {
    console.log('subscribing');
});

io.on('office message', function(from, data){
    console.log(data);
});