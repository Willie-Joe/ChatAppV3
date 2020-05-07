var express = require('express');
var loginRouter = express.Router();
const login = require("../../public/javascripts/login");

const { setLoginCookie } = require("../../util/cookie");




loginRouter.get('/', function (req, res, next) {

    res.render('public/login', {
        title: 'Login Page',
        login: login,
        email: req.params.email || "",
        password: req.params.password || ""
    });

});

loginRouter.post('/', authenticateLogin, setLoginCookie, function (req, res, next) {

    // check fo auth
    // set login-cookie
    res.send({ success: true, redirect: "/lobby" });

});

// authenticate login with db
function authenticateLogin(req, res, next) {
    console.log("req", req.body);
    const email = req.body.email;
    const password = req.body.password;
    console.log("req", email, password);
    if (password == "123") {
        console.log("to next");
        next();
    } else {
        res.status(401).send({ success: false, error: "Incorrect Username or Password!" })
    }

}




module.exports = loginRouter;