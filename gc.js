// simple Garbage Collection sample
// node --trace-gc gc.js

var objects = []
  , count 	= 0;

// some object to allocate
function foobarbaz() {
	this.id = ++count;
	this.foo = "foo";
	this.bar = ['b','a','r'];
	this.baz = { value: 'baz' };	
}

// add 0 to 50 objects, 
// do the same on the next chance
function add() {
	var times = Math.floor(Math.random()*51);
	while(times--)
		objects.push(new foobarbaz());
	process.nextTick(add);
}

// subtract 0 to 1000 objects, 
// do the same on the next chance
function sub() {
	var times = Math.floor(Math.random()*101);
	while(times--)
		objects.pop();
	process.nextTick(sub);
}

add();
// wait for 4 seconds before starting to subtract
setTimeout(sub, 4000);

setInterval(function() {
	console.log("\t\t\t\t\t" + count + " objects added, " + objects.length + " left in the array");
}, 3000);
