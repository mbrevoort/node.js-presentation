var express = require('express')
  , app = express.createServer()
  , db = {}
  , seq = 0;

app.use(express.bodyParser());

app.put('/foo', function(req, res) {
	var foo = req.body;
	foo.id = ++seq;
	db[foo.id] = foo;
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
	res.send(200)
});

app.delete('/foo/:id', function(req, res) {
	var id = req.params.id;
	if(!db[id])
		return res.send(404)
		
	delete db[id];
	res.send(200);	
});

app.listen(8080);
console.log("started on http://localhost:8080");

// PUT
// curl -i -X PUT -d '{"value":"bar"}' -H "Content-Type: application/json"  http://localhost:8080/foo
// GET
// curl -i http://localhost:8080/foo/1
// POST
// curl -i -X POST -d '{"value":"baz"}' -H "Content-Type: application/json"  http://localhost:8080/foo/1
// DELETE
// curl -i -X DELETE  http://localhost:8080/foo/1
