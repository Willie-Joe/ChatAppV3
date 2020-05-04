var express = require('express');
var publicRouter = express.Router();

// routes

const loginRouter = require("./publicRoutes/loginRoute");
const registerRouter = require("./publicRoutes/registerRoute");
const lobbyRouter = require("./publicRoutes/lobbyRoute");

const options = {
  path: "/",
  maxAge: 10000,
  httpOnly: false
}


// Check for login token
// If valid next()
// publicRouter.use(function (req, res, next) {
//   //if no login cookie

//   console.log("middle ware redirect")
//   // res.status(500).send({
//   //   error: "in",
//   //   redirect: "/login"
//   // })
//   res.render('public/login');
// });

publicRouter.use("/login", loginRouter);
publicRouter.use("/register", registerRouter);
publicRouter.use("/lobby", lobbyRouter);


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
