const { Pool } = require('pg');
const dotenv = require('dotenv/config');
const pool = new Pool({ connectionString: process.env.DB_CONN, ssl: true });


// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})






async function register(email, username, password) {
    return pool.connect()
        .query()
        .then()
        .catch()
        .finally()

}

module.exports = { register }