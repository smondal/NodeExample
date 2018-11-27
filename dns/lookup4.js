const dns = require('dns');

dns.resolve4('archive.org', (err,address) => {
	if(err) throw err;
	console.log(`addresses: ${JSON.stringify(address)}`);

})