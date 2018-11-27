var crypto = require('crypto');
const secret = "sandip";

const hash = crypto.createHmac('sha256', secret);
var hmac = hash.update("i love my mom").digest('hex');
console.log(hmac);