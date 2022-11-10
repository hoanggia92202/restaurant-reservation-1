/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(
        `
         CREATE TABLE reservations(
            reservation_id SERIAL PRIMARY KEY,
            first_name VARCHAR(30) NOT NULL,
            last_name VARCHAR(30) NOT NULL,
            mobile_number VARCHAR(20) NOT NULL,
            status VARCHAR(10) DEFAULT 'booked',
            reservation_date VARCHAR(20)  NOT NULL,
            reservation_time VARCHAR(10) NOT NULL,
            people INTEGER,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
         )
        `
    );
};

exports.down = pgm => {
    pgm.sql(`DROP TABLE reservations`);
};
