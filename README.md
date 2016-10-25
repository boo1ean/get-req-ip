## get-req-ip

Get request ip skipping private networks

### Installation

```
npm install get-req-ip
```

### Usage

```js
var getRequestIp = require('get-req-ip');

app.get('/', function (req, res) {
	var ip = getRequestIp(req);
});
```

### License

MIT
