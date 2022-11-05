const connectionString = process.env.CONNECTION_STRING;
const pgp = require("pg-promise")();
const db = pgp(connectionString);

const readByDate = async (date) => {
    return db.any(`SELECT * FROM reservations WHERE reservation_date = '${date}'`);
}

module.exports = {
    readByDate
}