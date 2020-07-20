const express = require('express');
const lobbyRouter = express.Router();
const cookies = require("cookie-parser");
const { setRoomCookie } = require("../../util/cookie")

const db = require("../../db/dbInterface");

// lobbyRouter.use(cookies);
lobbyRouter.get('/', function (req, res, next) {
    console.log("lobby", req.cookies.user);
    res.render('members/lobby', { title: 'Lobby', username: req.cookies.user });

});


lobbyRouter.post('/create', async function (req, res, next) {
    await db.joinRoom()
        .then()
        .catch();
})

lobbyRouter.put('/room', async function (req, res, next) {
    console.log("rout", req.body.userName, req.cookies.login, req.body.roomName, req.body.password)
    await db.joinRoom(req.body.userName, req.cookies.login, req.body.roomName, req.body.password).then(
        result => {
            // console.log("result", result)
            if (result.success) {
                setRoomCookie(result.roomName, result.roomToken, res);
                res.send({ success: true, roomName: result.roomName })
                return;
            }
            res.status(500).send({ success: false });
        }
    ).catch();
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