var events = require('events');
var util = require('util');

// var eventEmitter = new events.EventEmitter();

var Person = function(name){
	name = this.name;
}

util.inherits(Person, events.EventEmitter);

var james = new Person('james');

james.on("speak", function(msg){
	console.log("hello world" + msg)
})

console.log(james)
james.emit("speek", "hello world")
