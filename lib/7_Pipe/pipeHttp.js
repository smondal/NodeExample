var fs = require('fs');
var http = require('http');


var readStream = fs.createReadStream("readme.txt", "utf8");

var server = http.createServer(function(req,res){
	res.writeHead(500, {'Content-Type': "text/lain"});
	readStream.pipe(res);
});

server.listen(3000);

console.log("Server is listing 3000");