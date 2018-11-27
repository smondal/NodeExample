var http = require('http');
var fs = require('fs');

var ReadSream = fs.createReadStream("index.html", "utf8");

var server = http.createServer(function(req, res){
	res.writeHead(200, {"Content-Type" : "text/html"});
	ReadSream.pipe(res);
})

server.listen("3000", "127.0.0.1")

console.log("Server are running 3000")