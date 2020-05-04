var express = require('express');
var lobbyRouter = express.Router();

lobbyRouter.get('/', function (req, res, next) {

    res.render('public/lobby', { title: 'Lobby' });

});


module.exports = lobbyRouter;