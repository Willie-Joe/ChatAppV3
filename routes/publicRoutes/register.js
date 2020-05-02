var express = require('express');
var registerRouter = express.Router();

registerRouter.get('/', function (req, res, next) {

    res.render('public/register', { title: 'Register' });

});


module.exports = registerRouter;