var streaming = require('./lib/streaming')
  , server = require('./lib/server')

server.listen(8080);
console.log("http server listening on port 8080");
streaming.server.listen(9000);
console.log("streaming api server listening on port 9000");


