var streaming = require('./lib/streaming')
  , server = require('./lib/server')
  , io = require('socket.io').listen(server);
server.listen(8080);
console.log("http server listening on port 8080");
streaming.publish = function(data) { io.sockets.emit('data', data); };

// curl -i -X PUT -d '{"title":"Fubar", "author":"Mike"}' -H "Content-Type: application/json"  http://localhost:8080/foo
// curl -i -X POST -d '{"title":"Babar", "author":"Joe"}' -H "Content-Type: application/json"  http://localhost:8080/foo/1
// curl -i -X DELETE  http://localhost:8080/foo/1
