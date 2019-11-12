const http = require('http');

const httpServer = http.createServer((request, response) => {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
httpServer.listen(33333, () => {
    console.log((new Date()) + ' Server is listening on port 33333');
});

const io = require('socket.io')(httpServer);

io.on('connection', socket => {
    console.log('hello sio');

    socket.emit('news', JSON.stringify({hello: 'world'}));

    io.on('my other event', socket => {
        console.log(socket);
    })
});