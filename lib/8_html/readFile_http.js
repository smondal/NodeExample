var http = require('http');
var fs = require('fs');


var server = http.createServer(function(req, res){
	res.writeHead(200, {"Content-Type" : "text/html"});

	fs.readFile("index.html", "utf8", function(err, data){
		res.end(data)
	})
})

server.listen("3000", "127.0.0.1")

console.log("Server are running 3000")