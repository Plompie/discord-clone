module.exports = {
    usernameCheck: function(users, req, res, _socket) {
        var username = req.body.username;
        if(!users.includes(username) && (!users.some(users => users.userName === username) && (!/\s/.test(username)))) {
            users.push({socketID : _socket, userName : username});
            res.render('chat', {username : username});
        }
        else if(/\s/.test(username))
        {
            res.render('index', {error : "Gebruik geen spaties!"});
        }
        else
        {
            res.render('index', {error : "Gebruiker bestaat al!"});            
        }
    }
};