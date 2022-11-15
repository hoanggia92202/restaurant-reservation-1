/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(
        `
         CREATE TABLE tables(
            id SERIAL PRIMARY KEY,
            reservation_id INTEGER REFERENCES reservations(id) DEFAULT NULL,
            table_name VARCHAR(20) NOT NULL,
            capacity INTEGER,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
         )
        `
    );
};

exports.down = pgm => {
    pgm.sql(`DROP TABLE tables`);
};
