var express = require('express');
var loginRouter = express.Router();

loginRouter.get('/', function (req, res, next) {

    res.render('public/login', { title: 'Login Page' });

});


module.exports = loginRouter;