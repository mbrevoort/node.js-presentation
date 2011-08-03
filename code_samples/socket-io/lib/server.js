var express = require('express')
  , streaming = require('./streaming')
  , db = {}
  , seq = 0;

var app = module.exports = express.createServer();
app.use(express.bodyParser());
app.use(express.static(__dirname + '/../static'));


app.put('/foo', function(req, res) {
	var foo = req.body;
	foo.id = ++seq;
	db[foo.id] = foo;
	streaming.emit('create', 'foo', foo);
	res.send(foo, 201);
});


app.get('/foo', function(req, res) {
	var foos = [];
	Object.keys(db).forEach(function(id) { 
		foos.push(db[id]);
	});
	res.send(foos, 200);	
});

app.get('/foo/:id', function(req, res){
	var id = req.params.id;
	var foo = db[id];
	if(foo)
		res.send(foo, 200);
	else
		res.send(404);		
});

app.post('/foo/:id', function(req, res) {
	var foo = req.body;
	foo.id = req.params.id;

	if(!db[foo.id])
		return res.send(404)

	db[foo.id] = foo;
	streaming.emit('update', 'foo', foo);
	res.send(200)
});

app.delete('/foo/:id', function(req, res) {
	var id = req.params.id;
	if(!db[id])
		return res.send(404)
		
	streaming.emit('delete', 'foo', db[id]);		
	delete db[id];
	res.send(200);	
});
