const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server('4002');

let userConnected = false;

app.get('/', (req, res) => {
  console.log('Received request');
  res.json({userConnected: userConnected});
  res.end();
});

io.on('connection', (socket) => {
  console.log('a user connected');
  userConnected = true;
});

server.listen(4000, () => {
  console.log('Mock server listening on *:4000');
});