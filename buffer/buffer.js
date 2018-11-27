const buf = Buffer.from(["q", "n"]);

for(const b of buf){
	console.log(b)
}

try {
console.log("&&&&&&&&&&&&&&")
const x = new Error('I was created using a function call!');
throw x
}
catch(err){
	console.log("*************");
	console.log(err.message);
}