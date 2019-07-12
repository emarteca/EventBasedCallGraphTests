
var express = require("express");
var http = require("http");
var socket = require("socket.io");
var app = express();
var ejs = require("ejs");
var server = http.createServer(app);
var io = require("socket.io").listen(server);
var redis = require("redis");
// var _ = require("underscore");
// require("./models/User");

app.get("/",function(req,res){

  res.render("index",{});

});


  socket.on("start",function(data){
    console.log("Started");
  });

   socket.on("user_info",function(user_info){
    var self = this;
        var name = user_info.name;
        var password = user_info.password;
    user.name = name;
    user.password = password;
    var data = JSON.stringify({name: name,password: password});
  });
