var express = require('express');
var lobbyRouter = express.Router();

lobbyRouter.get('/', function (req, res, next) {

    res.render('public/room', { title: 'Lobby' });

});


module.exports = lobbyRouter;