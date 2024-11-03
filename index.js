const express = require('express');
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 8000;

app.use(express.static(__dirname + '/static/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});



io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});