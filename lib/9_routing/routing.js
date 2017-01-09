var http = require('http');
var fs = require('fs');

var index = fs.createReadStream("home.html", "utf8");
var contact = fs.createReadStream("contact.html", "utf8");
var page_404 = fs.createReadStream("404.html", "utf8");

var server = http.createServer(function(req, res){
	if(req.url ==="/home" || req.url ==="/"){
		res.writeHead(200, {"Content-Type" : "text/html"});	
		index.pipe(res);
	} else if(req.url ==="/contact"){
		res.writeHead(200, {"Content-Type" : "text/html"});	
		contact.pipe(res);
	}	else if(req.url === "/api/user"){
		var users = [{"name": "sandip", "age": 20}, {"name": "mampi", "age": 30}]
		res.writeHead(200, {"Content-Type" : "application/json"});	
		res.end(JSON.stringify(users))
	}else{
		res.writeHead(404, {"Content-Type" : "text/html"});
		page_404.pipe(res)
	}
})

server.listen("3000", "localhost")

console.log("Server are running 3000")