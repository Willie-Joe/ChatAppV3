const db = require("./dbQuery");


async function register(email, username, password) {
    console.log("reg interface1")
    return db.registerUser(email, username, password)
        .then(res => {
            console.log("in res", res.rows[0]);
            const resultCode = parseInt(res.rows[0].registeruser);
            if (resultCode == 0) {
                return { success: true }
            }
            const err = {
                success: false,
                dupEmail: resultCode > 1 ? false : true,
                dupUsername: resultCode % 2 == 1 ? false : true
            };
            console.log("db in err", err);
            return err;
        }).catch(err => {
            console.log("dbinterface err", err);
            return err
        });

}

module.exports = { register }
