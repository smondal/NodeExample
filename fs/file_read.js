var fs = require('fs'); 



fs.open('buffer.js', "r", (err,file)=> {
  console.log("error", err);
  console.log("file", file)
})


fs.readFile('mynewfile2.txt', function (err, file) {
  if (err) throw err;
  console.log(file);
});