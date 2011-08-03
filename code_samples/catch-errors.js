
process.on('uncaughtException', function(error) {
	console.log("Kaboom.... handle " + error);
});

process.nextTick(function() {
	throw new Error("Incoming!!!!");
})

setTimeout(function() {
	console.log("Nothing else to do... goodbye");
}, 5000);