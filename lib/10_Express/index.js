var express = require('express');
var app = express();

app.get("/", function(req, res){
	res.sendFile(__dirname + "/home.html")
})

app.listen(8080);