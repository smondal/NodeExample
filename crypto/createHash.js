var crypto = require('crypto');
const secret = "sandip";

const hash_obj = crypto.createHash('sha256', secret);
var hmac = hash_obj.update("i love my mom").digest('base64');
console.log(hmac.toString());


const sha_obj = crypto.createHash('sha1', secret);
var sha_hash = sha_obj.update("i love my mom").digest('base64');
console.log(sha_hash.toString());