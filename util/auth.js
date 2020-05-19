// publicRouter.use(checkLoginToken);
const db = require("../db/dbInterface");

function checkLoginToken(req, res, next) {
    console.log("checking login cookie");
    // call valid token with db
    // if good
    // continue
    // else to send err and redirect to login
    next();

}

module.exports = { checkLoginToken };