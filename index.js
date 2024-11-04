const express = require('express');
const app = express();
const http = require("http");
const server = http.createServer(app);
var bodyParser = require('body-parser');
const { Server } = require("socket.io");
const io = new Server(server);

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/', (req, res) => {
    console.log('receiving data ...');
    console.log('body is ',req.body);
    res.redirect('/')
})

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});