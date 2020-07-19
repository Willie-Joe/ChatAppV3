var express = require('express');
var router = express.Router();

// routes
const homeRouter = require("./public/home");
const loginRouter = require("./login");
const registerRouter = require("./register");
const lobbyRouter = require("./lobby");

const options = {
    path: "/",
    maxAge: 10000,
    httpOnly: false
}

router.use("/home", homeRouter);
router.use("/login", loginRouter);
router.use("/register", registerRouter);
router.use("/lobby", lobbyRouter);

// /* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect("/home");

});



router.get('/test', function (req, res, next) {
    console.log("cookieTest", req.cookies)
    res.clearCookie("cookieTest", options);
    console.log("cookieTestAfter", req.cookies)
    res.render('public/home', { title: 'ExpressTest' });

});

router.get('/test2', function (req, res, next) {
    console.log("cookieTest2", req.cookies)
    res.render('public/home', { title: 'ExpressTest' });

});


module.exports = router;
