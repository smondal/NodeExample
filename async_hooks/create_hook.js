var asyncHooks = require('async_hooks');
var http = require('http');
var fs = require('fs');

var createHook = asyncHooks.createHook({
	init: function(asyncId, type, triggerAsyncId, resource){
		fs.writeSync(1, `on init ${type} ${asyncId} \n`);
	},
	before: function(argument) {
		fs.writeSync(1, `before call \n`);
	}, 
  after: function(){
  	fs.writeSync(1, `after call \n`);
  },

	destroy: function(asyncId) {
		// body...
		fs.writeSync(1, `after destroy${asyncId} \n`);
	}

})

createHook.enable()

http.createServer(function (req, res) {
  res.end('hello sandip')
}).listen(807)