const connectionString = process.env.CONNECTION_STRING;
const pgp = require("pg-promise")();
const db = pgp(connectionString);

const read = async () => {
    return db.any(`
        SELECT * FROM tables
    `);
}

const create = async (data) => {
    return db.any(`
        INSERT INTO tables(table_name, capacity)
        VALUES('${data.table_name}', ${data.capacity})
    `);
}

module.exports = {
    read,
    create
}