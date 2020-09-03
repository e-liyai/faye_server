const http = require('http');
const faye = require('faye');

const bayeux = new faye.NodeAdapter({mount: '/faye'})

const server = http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello, non-Bayeux request');
});

bayeux.on('handshake', function(clientId) {
    console.log(clientId)
});

bayeux.on('publish', function(clientId, channel, data) {
    console.log(clientId, channel, data)
});

bayeux.on('subscribe', function(clientId, channel) {
    console.log(clientId, channel)
});

bayeux.attach(server);
server.listen(8080);