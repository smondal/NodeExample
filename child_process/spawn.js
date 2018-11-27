const {spawn} =require('child_process');

var child = spawn('cmd', ['dir']);

child.stdout.on('data', (data) =>{
	console.log(data.toString());
})

child.stderr.on('data', (data) =>{
	console.log("erroe", data);
});

child.on('exit', (code) => {
  console.log(`Child exited with code ${code}`);
});



const { spawn } = require('child_process');
const bat = spawn('cmd.exe', ['/c', 'help']);

bat.stdout.on('data', (data) => {
  console.log(data.toString());
});

bat.stderr.on('data', (data) => {
  console.log(data.toString());
});

bat.on('exit', (code) => {
  console.log(`Child exited with code ${code}`);
});