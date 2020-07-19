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
    // await db
})

lobbyRouter.get('/rooms', async function (req, res, next) {
    console.log("params", req.query);
    await db.getRooms(req.query.roomName).then(result => {
        console.log("lr result", result);
        res.send(result);
    }
    ).catch();
})

// lobbyRouter.get('/room/:roomName', async function (req, res, next) {
//     await db.getRooms(req.params.roomName).then().catch();
// })

module.exports = lobbyRouter;