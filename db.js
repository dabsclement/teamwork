const pool = require('./config/config');

const createUsersTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
    users(
        id SERIAL PRIMARY KEY,
        isAdmin BOOLEAN NOT NULL DEFAULT FALSE,
        firstName VARCHAR(128) NOT NULL,
        lastName VARCHAR(128) NOT NULL,
        email VARCHAR(128) NOT NULL UNIQUE,
        password VARCHAR(128) NOT NULL,
        gender VARCHAR(128) NOT NULL,
        jobRole VARCHAR(128) NOT NULL,
        department VARCHAR(128) NOT NULL,
        address VARCHAR(128) NOT NULL,
        registeredOn TIMESTAMP DEFAULT current_timestamp)`;
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    }).catch((err) => {
      console.log(err);
    });
};

module.exports = { createUsersTables };

require('make-runnable');
