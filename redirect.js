var http = require('http')

// module.exports is a middleware
var server = http.createServer(function (req, res) {
    res.statusCode = 302;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Location', "https://github.com/adrianlee");
    res.end('Redirecting to https://github.com/adrianlee');
}).listen(3000);
