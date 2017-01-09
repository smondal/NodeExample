var fs = require('fs');

var readStream = fs.createReadStream("readme.txt", "utf8");
var writeStream = fs.createWriteStream("writeme.txt", "utf8");

readStream.pipe(writeStream);


var http = require('http');

var server = http.createServer(function(req,res){
	res.writeHead(500, {'Content-Type': "text/plain"});
	readStream.pipe(res)
});

server.listen(3000);

console.log("Server is listing 3000");