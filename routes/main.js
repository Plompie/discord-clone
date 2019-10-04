var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var func = require("../js/chat.js");
var _socket = null;
var _username = null;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var users = [];

var returnRouter = function(io, req) {

    io.sockets.on('connection', function (socket) {
        socket.on('chat message', function(msg){
            userName = _username;
            var d = new Date();
 
            var date = d.getUTCDate();
            var month = d.getUTCMonth() + 1; // Since getUTCMonth() returns month from 0-11 not 1-12
            var year = d.getUTCFullYear();
            
            var dateStr = date + "/" + month + "/" + year;
            io.emit('chat message', {msg : msg, userName : userName, time : dateStr});
        });
       _socket =  socket.id;
    });

    app.get('/', function(req, res){
        res.redirect('/chat');
    });
    
    app.post('/chat', (req, res) => {
        func.usernameCheck(users, req, res, _socket);
        _username = req.body.username;
    });
    
    app.get('/chat', (req, res) => {
        res.render('index');
    });

    return app;
};
module.exports = returnRouter;