var express = require('express');
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
	data = {"age": 12, "job": "Engineer"}
	res.render("home", {data: data, "name" : "sandip"});
})

app.listen(8080);