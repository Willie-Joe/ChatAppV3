var express = require('express');
var registerRouter = express.Router();

registerRouter.get('/', function (req, res, next) {

    res.render('public/register', { title: 'Register' });

});

registerRouter.get('/getPath', function (req, res, next) {

    res.send(200, { path: "/register" });

});



module.exports = registerRouter;