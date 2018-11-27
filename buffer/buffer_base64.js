const buf = Buffer.alloc(11, 'aGVsbG8gd29ybGQ=', 'base64');
console.log(buf.toString("utf8"));
console.log(buf.toString("base64"));
console.log(buf.toString("hex"));
console.log(buf.toString('ascii'));
console.log(buf.toString('binary'));
console.log(Buffer.poolSize);