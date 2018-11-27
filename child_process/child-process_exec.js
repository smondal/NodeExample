var ch = require('child_process');
ch.exec('dir ', function(err, stdout, stderr){
	
	console.log("err", err);
	console.log("stdout", stdout);
	console.log("stderr", stderr);
})