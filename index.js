const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();
const http = require("http");
const server = http.createServer(app);
var bodyParser = require('body-parser');
const { Server } = require("socket.io");
const io = new Server(server);
const crypto = require("crypto");

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(express.static(__dirname + '/public/'));

app.get('/', (req, res) => {
    if(req.cookies.sessionId){
        res.sendFile(__dirname + '/index.html');
    }else{
        res.sendFile(__dirname + '/login.html');
    }
});

app.post('/', (req, res) => {
    res.cookie('sessionId', crypto.randomBytes(12).toString("hex"), {
        maxAge: 0.5 * 60 * 60 * 1000, // 30 minutes
        httpOnly: false
    });
    res.cookie('sessionName', req.body.username, {
        maxAge: 0.5 * 60 * 60 * 1000, // 30 minutes
        httpOnly: false
    });
    res.cookie('sessionAction', req.body.action, {
        maxAge: 0.5 * 60 * 60 * 1000, // 30 minutes
        httpOnly: false
    });

    res.redirect('/');
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
});

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});