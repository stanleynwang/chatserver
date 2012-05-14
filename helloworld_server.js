﻿var server = require('http').createServer(function(req, res){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end();
});
server.listen(8080);

var nowjs = require("now");
var everyone = nowjs.initialize(server);

everyone.connected(function(){
    console.log("Joined: " + this.now.name);
});


everyone.disconnected(function(){
    console.log("Left: " + this.now.name);
});

everyone.now.distributeMessage = function(message){
    everyone.now.receiveMessage(this.now.name, message);
};
