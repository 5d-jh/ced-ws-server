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

    socket.on('putq', msg => {

        try {
            // const data = JSON.parse(msg);

            io.emit('getq', msg);
        } catch (error) {
            console.error(error);
            io.emit('error', error);
        }
    });

    socket.on('puto', msg => {
        try {
            const data = JSON.parse(msg);
            io.emit('geto', data.map(
                o => {
                    const r = Math.sqrt(Math.abs(o.dist - o.px^2 - 0.009));
                    return {
                        type: o.type,
                        v: [k*r/0.03, r]
                    };
                }
            ));
        } catch (error) {
            console.error(error);
            io.emit('error', error);
        }
    });
});