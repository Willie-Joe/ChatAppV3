var express = require('express');
var publicRouter = express.Router();

// routes
const homeRouter = require("./publicRoutes/home");
const loginRouter = require("./publicRoutes/login");
const registerRouter = require("./publicRoutes/register");
const lobbyRouter = require("./publicRoutes/lobby");

const options = {
  path: "/",
  maxAge: 10000,
  httpOnly: false
}

publicRouter.use("/home", homeRouter);
publicRouter.use("/login", loginRouter);
publicRouter.use("/register", registerRouter);
publicRouter.use("/lobby", lobbyRouter);

/* GET home page. */
publicRouter.get('/', function (req, res, next) {
  res.redirect("/home");

});
// router.get('/home', function (req, res, next) {
//   console.log("cookieTest", req.cookies)
//   res.clearCookie("cookieTest", options);
//   console.log("cookieTestAfter", req.cookies)
//   res.render('public/home', { title: 'ExpreseesTest' });

// });


publicRouter.get('/test', function (req, res, next) {
  console.log("cookieTest", req.cookies)
  res.clearCookie("cookieTest", options);
  console.log("cookieTestAfter", req.cookies)
  res.render('public/home', { title: 'ExpressTest' });

});

publicRouter.get('/test2', function (req, res, next) {
  console.log("cookieTest2", req.cookies)
  res.render('public/home', { title: 'ExpressTest' });

});


module.exports = publicRouter;
