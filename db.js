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
const createGifTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  gifs(
    gifId UUID PRIMARY KEY,
    title VARCHAR(128) NOT NULL,
    imageUrl VARCHAR(225) NOT NULL,
    flaggedInvalid INTEGER DEFAULT 0,
    claps INTEGER DEFAULT 0,
    dateCreated TIMESTAMP DEFAULT current_timestamp,
    dateUpdated TIMESTAMP DEFAULT current_timestamp,
    userId SERIAL REFERENCES users(id)
 
  )`;
  pool.query(queryText)
  .then((res) => {
    console.log(res);
    pool.end();
  }).catch((err) => {
    console.log(err);
  });

}
module.exports = { createUsersTables, createGifTables };

require('make-runnable');
