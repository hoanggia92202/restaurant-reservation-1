const connectionString = process.env.CONNECTION_STRING;
const pgp = require("pg-promise")();
const db = pgp(connectionString);

const readByDate = async (date) => {
    return db.any(`SELECT * FROM reservations WHERE reservation_date = '${date}'`);
}

const readByMobileNumber = async (mobile_number) => {
    return db.any(`SELECT * FROM reservations WHERE mobile_number = '${mobile_number}'`)
}

const create = async (data) => {
    return db.any(`INSERT INTO reservations(first_name, last_name, mobile_number, reservation_date, reservation_time, people)
                    VALUES('${data.first_name}', '${data.last_name}', '${data.mobile_number}', '${data.reservation_date}', '${data.reservation_time}', ${data.people})`);
}

const cancelReservation = async (id) => {
    return db.any(`DELETE FROM reservations WHERE reservation_id = ${id}`);
}

module.exports = {
    readByDate,
    readByMobileNumber,
    create,
    cancelReservation
}