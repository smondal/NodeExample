process.stdout.write("sandip" + "\n")

var fs = require('fs');
fs.createReadStream(__filename).pipe(process.stdout)