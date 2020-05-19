const express = require('express');
const membersRouter = express.Router();
const { checkLoginToken } = require("../util/auth")


const roomRouter = require("./membersRoutes/roomsRoute");


membersRouter.use("/room", roomRouter);
// membersRouter.use(checkLoginToken);

/* GET users listing. */
// membersRouter.get('/:roomID', function (req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = membersRouter;
