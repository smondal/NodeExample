const { spawn } = require('child_process');
const ls =  spawn('cmd.exe', ['/c', 'dir']);

console.log(ls)

ls.stdout.on('data', (data) => {
  console.log("on data", data.toString());
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log("on data err", data.toString());
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});