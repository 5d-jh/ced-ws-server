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
    console.log(`[${new Date()}] Socket connected.`);

    socket.emit('get_a', {hello: 'world'});

    socket.on('put_a', socket => {
        socket.emit('get_a', incoming);
        console.log(socket);
    });
});