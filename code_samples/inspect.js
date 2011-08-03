var util = require('util');
var obj = {
	plants: {
		flowsers: ["Roses", "Violets"],
		trees: {
			evergreens: ["Pine"],
			total: 93802
		}
	}
};

console.log( util.inspect(obj, true, null));
