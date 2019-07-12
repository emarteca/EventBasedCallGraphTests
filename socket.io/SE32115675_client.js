
var fs = require("fs"); // stop having global variable problems


var socket = io();

socket.on("connect", function(){
    console.log("Client connected.");
    this.on("disconnect", function(){
        console.error("Client disconnected");
    });
});