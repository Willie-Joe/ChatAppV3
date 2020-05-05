const db = require("./dbQuery");


async function register(email, username, password) {
    console.log("reg interface")
    db.register(email, username, password);

}

module.exports = { register }
