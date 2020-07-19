const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const db = require("../db/dbInterface");

// need DB_CONN as DATABASE_URL fom heroku is undefined

// console.log("db", process.env.DATABASE_URL, process.env.PORT)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || process.env.DB_CONN,
    ssl: {
        rejectUnauthorized: false
    }
});


// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})





async function registerUser(email, username, password) {
    console.log("q reg", email, username, password)
    const client = await pool.connect();

    const text = "SELECT registerUser($1::email, $2::varchar(20), $3::varchar(50))";
    const values = [email, username, password];

    return client.query(text, values)
        .then(res => {
            console.log("dbQ reg res", res.rows);
            return res
        })
        .catch(err => {
            console.log("dbQ reg err", err);
            return err
        })
        .finally(client.release());


}

async function loginUser(email, password) {
    const client = await pool.connect();
    console.log(email, password);
    const text = "SELECT username, l_token FROM loginUser($1::email, $2::varchar(50))";
    const values = [email, password];

    return client.query(text, values)
        .then(res => {

            console.log("dbQ login res", res.rows);
            return res;
        })
        .catch(err => {
            console.log("dbQ login err", err);
            return err
        })
        .finally(client.release());;
}

async function validateLoginToken(username, token) {
    const client = await pool.connect();

    const text = "SELECT username, l_token FROM validateLoginToken($1::varchar(20), $2::uuid)";
    const values = [username, token];
    console.log(username, token);
    return client.query(text, values)
        .then(res => {
            console.log("dbQ vlt res", res.rows);
            return res
        })
        .catch(err => {
            console.log("dbQ vlt err", err);
            return err
        })
        .finally(client.release());

}

async function getRooms() {
    const client = await pool.connect();

    const text = "SELECT room_name, has_password FROM Room WHERE is_private = false"
    return client.query(text).then(result => {
        return result.rows;

    }).catch().finally(client.release());
}


async function findRooms(searchTerm) {
    const client = await pool.connect();

    const text = "SELECT room_name, has_password FROM Room WHERE room_name LIKE $1||'%' AND is_private = false";
    const values = [searchTerm];
    return client.query(text, values).then(result => {
        return result.rows;

    }).catch().finally(client.release());
}

// async function createRoom(user, roomname, password) {
//     const client = await pool.connect();
//     const text
// }

module.exports = { registerUser, loginUser, validateLoginToken, getRooms, findRooms }
