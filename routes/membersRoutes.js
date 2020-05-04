var express = require('express');
var membersRouter = express.Router();


const roomRouter = require("./membersRoutes/roomsRoute");


membersRouter.use("/room", roomRouter);

/* GET users listing. */
// membersRouter.get('/:roomID', function (req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = membersRouter;
