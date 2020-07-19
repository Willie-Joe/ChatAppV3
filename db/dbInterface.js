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

async function validateLoginToken(username, token) {
    return db.validateLoginToken(username, token)
        .then(res => {

            if (!res.rows || !res.rows[0]) {
                console.log("dbI vlt err", res);
                return {
                    success: false,
                    err: "Provided User and Token does not match"
                }

            }
            console.log("dbI vlt res", res.rows[0]);
            return {

                success: true,
                l_token: res.rows[0].l_token
            }
        })
        .catch(err => {
            console.log("dbI vlt err", err);
            return {
                success: false,
                err: err
            };
        });

}

async function createRoom(user, room, password) {
    return db.createRoom(user, room, password)
        .then(res => {
            if (!res.rows || !res.rows[0]) {
                return {
                    success: false,
                    err: "Couldn't create room"

                }
            }
            return {
                success: true,
                r_token: res.rows[0].r_token

            }
        })
        .catch(err => {
            console.log("dbIn createRoom err", err);
            return {
                success: false,
                err: "Couldn't create room"
            }
        });
}
async function getRooms(roomName) {
    console.log("room name", roomName);

    if (roomName == "" || roomName == undefined) {
        return db.getRooms().then(result => {
            return {
                success: true,
                result: result
            };
        }).catch();
    }

    return db.findRooms(roomName).then(result => {
        return {
            success: true,
            result: result
        };
    }).catch();


}



async function findRooms(user, searchTerm) {

}

async function joinRoom(user, room, password) {

}

module.exports = { registerUser, loginUser, validateLoginToken, createRoom, joinRoom, getRooms, findRooms }
