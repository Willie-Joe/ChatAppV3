const express = require('express');
const lobbyRouter = express.Router();
const db = require("../../db/dbInterface");

lobbyRouter.get('/', function (req, res, next) {
    console.log("lobby", req.cookies.user);
    res.render('members/lobby', { title: 'Lobby', username: req.cookies.user });

});


lobbyRouter.post('/create', async function (req, res, next) {
    await db.joinRoom()
        .then()
        .catch();
})

lobbyRouter.post('/join', function (req, res, next) {

})


module.exports = lobbyRouter;