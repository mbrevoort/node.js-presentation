var express = require('express') 
  , app = express.createServer()
  , io = require('socket.io').listen(app);

app.listen(8080)
app.use(express.static(__dirname + '/static'));

io.sockets.on('connection', function (socket) {
	
  socket.on('select', function (location) {
	socket.broadcast.emit('select', location);
  });

  socket.on('hover', function (location) {
	socket.broadcast.emit('hover', location);
  });

  socket.on('unhover', function (location) {
	socket.broadcast.emit('unhover', location);
  });

});
console.log("listening on 8080");