const dns = require('dns');

dns.resolve6('archive.org', (err,address) => {
	if(err) throw err;
	console.log(`addresses: ${JSON.stringify(address)}`);
})