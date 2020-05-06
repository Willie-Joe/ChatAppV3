const db = require("./dbQuery");


function register(email, username, password) {
    console.log("reg interface1")
    db.register(email, username, password);
    console.log("reg interface2")
    //  .then(res => res).catch(err => console.log("dbinterface err", err));

}

module.exports = { register }
