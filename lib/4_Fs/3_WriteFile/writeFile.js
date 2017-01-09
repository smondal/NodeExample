var fs = require('fs');

fs.writeFile("readMe.txt", "hellow my world", "utf8', 0o666, (err) =>{
	if(err) throw err;
	console.log("its saved!")
});