var express = require('express');
var homeRouter = express.Router();




homeRouter.get('/home', function (req, res, next) {

    res.render('public/home', { title: 'HomePage' });

});
homeRouter.get('/', function (req, res, next) {
    res.redirect("/home");

});


module.exports = homeRouter;