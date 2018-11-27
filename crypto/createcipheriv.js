var crypto = require('crypto');
const iv = crypto.randomBytes(16); //length should be always 16
const salt = "foobar";
const hash = crypto.createHash("sha1");

hash.update(salt);

// console.log(hash.digest(hex));

// // `hash.digest()` returns a Buffer by default when no encoding is given
let key = hash.digest().slice(0, 16);
// console.log(key);

// key = Buffer.alloc(16, "halleo");

const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
console.log(cipher.final('utf8'));