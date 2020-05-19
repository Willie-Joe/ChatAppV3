// publicRouter.use(checkLoginToken);

function checkLoginToken(req, res, next) {
    console.log("checking login cookie");
    res.redirect("/home");

}

module.exports = { checkLoginToken };