// for http as of node v0.4.10
require ('http')
	.getAgent("api.twitter.com", 80)
	.maxSockets = 100;

// for https as of node v0.4.10
require ('https')
	.getAgent({ host:"docs.google.com", port: 443 })
	.maxSockets = 100;
