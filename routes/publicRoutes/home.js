var express = require('express');
var homeRouter = express.Router();




homeRouter.get('/', function (req, res, next) {

    res.render('public/home', { title: 'HomePage' });

});



module.exports = homeRouter;