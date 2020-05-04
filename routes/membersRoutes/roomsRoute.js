var express = require('express');
var roomRouter = express.Router();




roomRouter.get('/:roomID', function (req, res, next) {

    res.render('members/room', { title: `Room ${req.params.roomID}` });

});



module.exports = roomRouter;