var express = require('express');
var loginRouter = express.Router();
const login = require("../../public/javascripts/login");
const db = require("../../db/dbInterface");


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
    console.log("login done")
    // check fo auth
    // set login-cookie
    res.send({ success: true, redirect: "/lobby" });

});

// authenticate login with db
async function authenticateLogin(req, res, next) {
    console.log("req", req.body);
    const email = req.body.email;
    const password = req.body.password;
    console.log("req", email, password);


    await db.loginUser(email, password).then(result => {
        console.log("result fdsfds", result, result.l_token)
        if (result.success) {
            res.locals.l_token = result.l_token;
            // console.log("res.local", req)
            console.log("ok------------");
            next();
            return;
        }
        res.status(401).send({ success: false, error: "Incorrect Username or Password!" })
    }).catch(err => {
        console.log("liR login err", err)
        res.status(500).send({ success: false, error: "Server Error" })
    })

}




module.exports = loginRouter;