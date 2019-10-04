var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var users = [];
var routes = require('./routes/main')(io);

app.set("view engine","ejs");
app.use('/', routes);

http.listen(3000, function(){
    console.log('listening on *:3000');
});
