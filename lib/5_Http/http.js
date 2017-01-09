var http = require('http');

var server = http.createServer(function(req,res){
	res.writeHead(500, {'Content-Type': "text/plain"});
	res.end("hello worssld")
});

server.listen(3000);

console.log("Server is listing 3000");
