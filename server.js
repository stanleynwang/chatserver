var server = require('http').createServer(function(req, res){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end();
});
var port = process.env.PORT || 8080;
server.listen(port);

var nowjs = require("now");
var everyone = nowjs.initialize(server, {
    socketio: {
        transports:['xhr-polling','jsonp-polling']
    }
});

everyone.connected(function(){
    console.log("Joined: " + this.now.name);
});


everyone.disconnected(function(){
    console.log("Left: " + this.now.name);
});

everyone.now.distributeMessage = function(message){
    everyone.now.receiveMessage(this.now.name, message);
};

everyone.now.distributeMessageToRound = function(message){
    everyone.now.receiveMessageIfSameRound(this.now.name, message, this.now.round);
};
