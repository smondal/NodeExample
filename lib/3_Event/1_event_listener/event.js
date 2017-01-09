var events = require('events');

var eventEmitter = new events.EventEmitter();

var listner1 = function(message){
	console.log("Listener 1 execute with this message: " + message)
	// console.log("Listener1 is execute");
}

var listner2 = function(){
	console.log("Listener2 is execute");
}

eventEmitter.addListener('connection', (message) => {
	console.log(message)
});

eventEmitter.on('connection', listner1);
eventEmitter.on('connection', listner2);

eventEmitter.emit('connection', "I am fired");


eventEmitter.removeListener('connection', listner1);
console.log("Removed the listener1")
eventEmitter.emit('connection');