var server = require('http').createServer(function(req, res){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end();
});
if (process.env.PORT !== "")
    process.env.PORT = 8080;
server.listen(process.env.PORT);

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
