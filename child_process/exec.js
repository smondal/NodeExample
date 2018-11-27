const { exec } = require('child_process');

const child = exec('dir', (error, stdout, stderr) => {
	if(error){
		throw error;
	}
	console.log(stdout)
	console.log(stderr)
} )
child.stdout.on('data', (data) => {
  // console.log(`stdout: ${data}`);
});




//second example

const bat = exec('help');

bat.stdout.on('data', (data) => {
  console.log(data.toString());
});

bat.stderr.on('data', (data) => {
  console.log(data.toString());
});

bat.on('exit', (code) => {
  console.log(`Child exited with code ${code}`);
});