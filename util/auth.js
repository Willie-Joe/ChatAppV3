// publicRouter.use(checkLoginToken);
const db = require("../db/dbInterface");

async function checkLoginToken(req, res, next) {
    console.log("checking login cookie", req.cookies);
    await db.validateLoginToken(req.cookies.user, req.cookies.login)
        .then(result => {
            if (result.success) {
                console.log("good login")
                next();
                return;
            }

            // res.status(401).send({
            //     success: false,
            //     error: "Provided token is not valid!",
            //     redirect: "/login"
            // })
            res.status(401).redirect("/login");


        }).catch(err => {
            console.log("liR login err", err);
            res.status(501).redirect("/login");
            // res.status(500).send({
            //     success: false,
            //     error: "Provided token is not valid!",
            //     redirect: "/login"
            // });
        }
        );



}

module.exports = { checkLoginToken };