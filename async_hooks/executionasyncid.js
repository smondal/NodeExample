var fs = require('fs'); 
var async_hook = require('async_hooks');


fs.open('buffer.js', "r", (err,file)=> {
  console.log("error", err);
  console.log("file", file);
  console.log("open async_hook", async_hook.executionAsyncId());
})


fs.open('process.js', "r", (err,file)=> {
  console.log("error", err);
  console.log("file", file);
  console.log("another open async_hook", async_hook.executionAsyncId());
})


fs.readFile('mynewfile2.txt', function (err, file) {
  if (err) throw err;
  console.log(file);
  console.log("FireRead async_hook", async_hook.executionAsyncId());
});