var express = require('express');
var registerRouter = express.Router();
const db = require("../../db/dbInterface");




registerRouter.get('/', function (req, res, next) {

    res.render('public/register', { title: 'Register' });

});

// registerRouter.get('/getPath', function (req, res, next) {

//     res.send(200, { path: "/register" });

// });

registerRouter.post("/", registerToDb, function (req, res, next) {
    res.send({
        success: true,
        redirect: "/login",
        email: req.body.email,
        password: req.body.password
    });
})



async function registerToDb(req, res, next) {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;




    await db.register(email, username, password)
        .then(result => {
            console.log(" reg route res", result)
            if (result.success) {
                return next();
            }
            console.log("dbq bad")
            res.status(401).send(result);
        })
        .catch(err => {
            console.log("dbq err", err)
            res.status(500).send({ success: false, error: "Server Error" });
        });


}

module.exports = registerRouter;