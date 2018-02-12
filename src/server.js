const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const index = fs.readFileSync(`${__dirname}/../client/index.html`);

const onRequest = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const app = http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);

const io = socketio(app);

const image = {
  x: 300,
  y: 300,
  height: 200,
  width: 200,
};

io.on('connect', (socket) => {
  socket.join('room');

  socket.on('draw', (data) => {
    image.x = data.x;
    image.y = data.y;
    image.height = data.height;
    image.width = data.width;

    socket.emit('update', image);
  });
});
