var cluster = require('cluster');

cluster('app.js')
    .set('workers', 16) // defaults to # of cores
	.use(cluster.logger('logs'))
	.use(cluster.stats())
	.use(cluster.cli())
	.use(cluster.repl(8888))
	.listen('80')
