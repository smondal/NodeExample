var fs = require('fs');

var readStream = fs.createReadStream("readme.txt", "utf8");
var writeStream = fs.createWriteStream("writeme.txt", "utf8");

readStream.on('data', function(chunk){
	writeStream.write(chunk);
})