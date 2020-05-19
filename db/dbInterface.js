/**
 * dbInterface.js
 * 
 * Responsible of handling the result of database queries then pass back to receiver
 * in JSON format. 
 * 
 */
const db = require("./dbQuery");


async function registerUser(email, username, password) {

    return db.registerUser(email, username, password)
        .then(res => {
            console.log("dbI reg errs", res.code);
            if (res.code == '23514') {
                return {
                    success: false,
                    errorMsg: "Invalid email"
                }
            } const resultCode = parseInt(res.rows[0].registeruser);




            if (resultCode == 0) {
                return { success: true }
            }
            const errorMsg = "";

            if (resultCode > 1) errorMsg += "Email already in use";
            if (resultCode % 2 == 1) errorMsg += "Username already in use";

            const err = {
                success: false,
                errorMsg: errorMsg
            };
            console.log("dbI reg err", err);
            return err;
        }).catch(err => {
            console.log("dbI reg err", err);
            return {
                success: false,
                err: err
            };
        });

}

async function loginUser(email, password) {
    return db.loginUser(email, password).then(res => {
        console.log("dbIn res", res.rows)
        if (!res.rows || !res.rows[0]) {
            console.log("fail here")
            return {
                success: false,
                err: "Incorrect Username or Password"
            };
        }
        console.log("dbIn resffffffffffffffffffff")
        return {
            success: true,
            username: res.rows[0].username,
            l_token: res.rows[0].l_token
        }
    }).catch(err => {
        console.log("dbI login err", err);
        return {
            success: false,
            err: err
        };
    });
}

module.exports = { registerUser, loginUser }
