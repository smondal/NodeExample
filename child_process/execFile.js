const execFile = require('child_process').execFile;
// const child = execFile('node', ['--version'], (error, stdout, stderr) => {
//     if (error) {
//         console.error('stderr', stderr);
//         throw error;
//     }
//     console.log('stdout', stdout);
// });


//SECOND EXAMPLE

const bat = execFile(`${__dirname}/exec.js`);

bat.stdout.on('data', (data) => {
  console.log(data.toString());
});

bat.stderr.on('data', (data) => {
  console.log(data.toString());
});

bat.on('exit', (code) => {
  console.log(`Child exited with code ${code}`);
});