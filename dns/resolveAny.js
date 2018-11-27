const dns = require('dns');

dns.resolveAny('archive.org', (err,address) => {
	if(err) throw err;
	console.log(`addresses: ${JSON.stringify(address)}`);
})