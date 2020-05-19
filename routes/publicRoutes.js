var express = require('express');
var publicRouter = express.Router();

const { checkLoginToken } = require("../util/auth")
// routes

const loginRouter = require("./publicRoutes/loginRoute");
const registerRouter = require("./publicRoutes/registerRoute");
const lobbyRouter = require("./publicRoutes/lobbyRoute");

const options = {
  path: "/",
  maxAge: 10000,
  httpOnly: false
}


// publicRouter.use(checkLoginToken);
publicRouter.use("/login", loginRouter);
publicRouter.use("/register", registerRouter);
publicRouter.use("/lobby", lobbyRouter);
publicRouter.use(checkLoginToken);








// router.get('/home', function (req, res, next) {
//   console.log("cookieTest", req.cookies)
//   res.clearCookie("cookieTest", options);
//   console.log("cookieTestAfter", req.cookies)
//   res.render('public/home', { title: 'ExpreseesTest' });

// });





module.exports = publicRouter;
