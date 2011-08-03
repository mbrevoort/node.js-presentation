var _ = require("underscore")
  , events = require("events")
  , net = require('net')
  , util = require('util')


var self = module.exports = {

	clients: {},

	publish: function (data) {
		Object.keys(self.clients).forEach(function(id) {
			self.clients[id].write(JSON.stringify(data) + "\n");
		});	
	},

	server:  net.createServer(function (socket) {

		// create an ID for the client and store it on the client
		socket.id = socket.remoteAddress + ":" + socket.remotePort;

		// register the client
		self.clients[socket.id] = socket;

		socket.on('data', function(data) {
			publish(data);
		});

		socket.on('close', function() {
			delete self.clients[socket.id];
		});
	}),

}

_.extend(self, new events.EventEmitter);

self.on('create', function(type, data) {
	self.publish({
		action: "create",
		type: type,
		data: data
	});
});

self.on('update', function(type, data) {
	self.publish({
		action: "update",
		type: type,
		data: data
	});
});

self.on('delete', function(type, data) {
	self.publish({
		action: "delete",
		type: type,
		data: data
	});
});


