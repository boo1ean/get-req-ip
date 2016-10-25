module.exports = function getRequestIp (req) {
	var ips = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).split(',');

	for (var i in ips) {
		var ipTokens = ips[i].trim().split('.');
		var t1 = parseInt(ipTokens[0]);
		var t2 = parseInt(ipTokens[1]);

		// Skip private subnetworks
		if (ipTokens.length !== 4                        // 4 octets exist
			|| (t1 === 192 && t2 === 168)                // 192.16.0.0/16
			|| t1 === 10                                 // 10.0.0.0/8
			|| t1 === 127                                // 127.0.0.0/8
			|| (t1 === 172 && (t2 > 15 && t2 < 32))      // 172.16.0.0/12
			|| (t1 === 100 && (t2 > 63 && t2 < 128))     // 100.64.0.0/10
			|| (t1 === 198 && (t2 === 18 || t2 === 19))  // 198.18.0.0/15
			|| (t1 === 169 && t2 === 254)                // 169.254.0.0/16
		) {
			continue;
		}

		return ips[i];
	}

	return ips.shift();
}
