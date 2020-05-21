var express = require('express');
var lobbyRouter = express.Router();

lobbyRouter.get('/', function (req, res, next) {
    console.log("lobby", req.cookies.user);
    res.render('members/lobby', { title: 'Lobby', username: req.cookies.user });

});


module.exports = lobbyRouter;