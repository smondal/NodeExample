var crypto = require('crypto');
const iv = crypto.randomBytes(16); 

console.log(iv.toString('hex'));