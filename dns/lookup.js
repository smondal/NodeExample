const dns = require('dns');

dns.lookup("google.com", (err,address,family) => {
	console.log(`addresses: ${JSON.stringify(address)}`);
	console.log("address %j and family %s", address, family);
})