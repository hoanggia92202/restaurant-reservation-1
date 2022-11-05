const connectionString = process.env.CONNECTION_STRING;
const pgp = require("pg-promise")();
const db = pgp(connectionString);

const list = () => {
    return db.any('select * from reservations');
}

module.exports = {
    read: list
}