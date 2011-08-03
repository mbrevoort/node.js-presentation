// order doesn't matter
var leftToProcess = entries.length;

// doSomething's will be executed in parallel
for (var i=0, l=entries.length; i<l; i++) {              
     (function(foo) {
         process.nextTick(function() { 
			doSomething(foo); 
			if(--leftToProcess === 0) {
				done();
			}
		});                  
     })(entries[i]);
}

// ----------------------------------------------------------------------------
// order matters
function processEntry(entries, index) {
	index = index || 0;
	if(index === entries.length) return done();

	doSomething(entries[index]);
	process.nextTick(function() { 
		processEntry(entries, index++) 
	});
}

processEntry(entries);

// ----------------------------------------------------------------------------
// order doesn't matter
// doSomething has callbac and is Async
// doSomethingAsync's happen in parallel 
var leftToProcess = entries.length;

// doSomething's will be executed in parallel
// ----------------------------------------------------------------------------
         
     (function(foo) {
         process.nextTick(function() { 
			doSomethingAsync(foo, function() {
				if(--leftToProcess === 0) {
					done();
				}				
			}); 
		});                  
     })(entries[i]);
}

// ----------------------------------------------------------------------------
// blocking loop
for (var i=0, l=entries.length; i<l; i++) {              
	doSomething(entries[i]); 
}
