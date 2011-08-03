var net = require('net')
  , util = require('util')
  , clients = {};

var server = net.createServer(function (socket) {
	socket.id = socket.remoteAddress + ":" + socket.remotePort;
	clients[socket.id] = socket;
	publish(socket.id + " has joined\n", socket.id);
	
	socket.on('data', function(data) {
		publish(data, socket.id);
	});
	
	socket.on('close', function() {
		publish("GOODBYE\n", socket.id);
		delete clients[socket.id];
	});
})

function publish(data, fromId) {
	Object.keys(clients).forEach(function(id) {
		if(id != fromId) {
			clients[id].write(fromId + ": " + data);
		}
	});	
}

server.listen('9000');
console.log("listening on port 9000");