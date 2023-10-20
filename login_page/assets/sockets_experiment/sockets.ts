import express from 'express';
import { createServer } from 'http';
import { join } from 'path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('Hola', "Su imagen está lista");
});

server.listen(4242, () => {
  console.log('server running at http://localhost:3000');
});
