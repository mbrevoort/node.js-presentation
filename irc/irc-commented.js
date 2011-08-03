var net = require('net')
  , util = require('util')
  , clients = {}
  , GRAY = '\033[90m'
  , GREEN = '\033[32m'
  , WHITE = '\033[0m';

var server = net.createServer(function (socket) {
	
	// create an ID for the client and store it on the client
	socket.id = socket.remoteAddress + ":" + socket.remotePort;
	
	// register the client
	clients[socket.id] = socket;
	
	// say hello to the socket
	socket.write("Hello " + socket.id + "! There are " + (Object.keys(clients).length - 1) + " others\n");
	
	// let the other clients know a new friend has joined
	publish(socket.id + " has joined\n", socket.id);
	
	// when a client sends a message, publish to all the other clietns
	socket.on('data', function(data) {
		publish(data, socket.id);
	});
	
	// when a client leave, publish a goodbye message to all other clients
	// and unregister the client
	socket.on('close', function() {
		publish("GOODBYE\n", socket.id);
		delete clients[socket.id];
	});
})

// publish a message to other clients, exclude the client who send the message
// identified by the fromId
function publish(data, fromId) {
	Object.keys(clients).forEach(function(id) {
		if(id != fromId) {
			clients[id].write(GRAY + fromId + ": " + GREEN + data + WHITE);
			//clients[id].write(fromId + ": " + data);
		}
	});	
}

// our network server should start listening!
server.listen('9000');
