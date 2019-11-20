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
const createGifsTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
    gifs(
      gifId SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      imageUrl VARCHAR(255) NOT NULL,
      public_id VARCHAR(255) NOT NULL,
      flaggedInvalid INTEGER DEFAULT 0,
      claps INTEGER DEFAULT 0,
      dateCreated TIMESTAMP DEFAULT current_timestamp,
      dataUpdated TIMESTAMP DEFAULT current_timestamp,
      userId SERIAL REFERENCES users(id)
      )`;
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    }).catch((err) => {
      console.log(err);
    });
};
const createArticlesTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
    articles(
      articleId SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content VARCHAR(100000) NOT NULL,
      dateCreated TIMESTAMP DEFAULT current_timestamp,
      dataUpdated TIMESTAMP DEFAULT current_timestamp,
      userId SERIAL REFERENCES users(id)
    )`;
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    }).catch((err) => {
      console.log(err);
    });
};
module.exports = { createUsersTables, createGifsTables, createArticlesTables};

require('make-runnable');
