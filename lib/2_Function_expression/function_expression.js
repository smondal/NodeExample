function sayHi(){
	console.log("hi")
}

var sayHello = function(){
	console.log("Hello")
} 

//sayHello();

function callFunction(fun){
	fun();
}

callFunction(sayHi)