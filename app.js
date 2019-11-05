const { server: WebSocketServer } = require('websocket');
const http = require('http');

const httpServer = http.createServer((request, response) => {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
httpServer.listen(33333, () => {
    console.log((new Date()) + ' Server is listening on port 33333');
});

const websocketServer = new WebSocketServer({ httpServer });

websocketServer.on('request', request => {
    const connection = request.accept();
    console.log((new Date()) + ' Connection accepted.');
    
    connection.on('message', message => {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF('pong');
        }
    });

    connection.on('close', (reasonCode, description) => {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});