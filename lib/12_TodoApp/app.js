var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set("view engine", "ejs");

app.use(express.static('public'))
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 


var todoController = require('./controller/todos')
todoController(app);

app.listen(3000);
console.log("App is listing port 3000");