var EventEmiter = require('events');

class MyEmiter extends EventEmiter{};

const myEmiter = new MyEmiter();



myEmiter.on("withfunction", function(a="none") {
	console.log(this)
	console.log("Filed is opend", a);
})


//it is possible to ES6 arrow function as a listener when use this
myEmiter.on("witharrow", (a="none")  => {
	console.log(this)
	console.log("Filed is opend", a);
})


myEmiter.emit("withfunction", "filename.txt");
myEmiter.emit("witharrow", "filename.txt");




console.log(myEmiter.eventNames());

