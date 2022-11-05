const connectionString = process.env.CONNECTION_STRING;
const pgp = require("pg-promise")();
const db = pgp(connectionString);

const readByDate = async (date) => {
    return db.any(`SELECT * FROM reservations WHERE reservation_date = '${date}'`);
}

const create = async (data) => {
    return db.any(`INSERT INTO reservations(first_name, last_name, mobile_number, reservation_date, reservation_time, people)
                    VALUES('${data.first_name}', '${data.last_name}', '${data.mobile_number}', '${data.reservation_date}', '${data.reservation_time}', ${data.people})`);
}

module.exports = {
    readByDate,
    create
}