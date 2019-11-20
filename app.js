// import express from 'express';
const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const url = require('url');
const hpp = require('hpp');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const userRoutes = require('./routes/user');
const gifRoutes = require('./routes/gif');
const articlesRoutes = require('./routes/articles');


require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(hpp());
app.use(helmet());

// this is to prevent CORS errors
// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
app.use(fileUpload({
  useTempFiles: true,
  // tempFileDir: '/tmp/'
}));

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/gif', gifRoutes);
app.use('/api/v1/article', articlesRoutes);

app.use((req, res, next) => {
  next(createError(404));
});

//
app.use('/api', (req, res,) => {
  return res.status(200).send({ message: 'YAY! Congratulations! Your first endpoint is working' });
});

app.use('/api', (req, res, next) => {
  const path = url.parse(req.url, true);
  const apiVersion = path.pathname.split('/');
  // eslint-disable-next-line no-unused-expressions
  (apiVersion[1] !== 'v1') ? res.json({ message: `sorry, version ${apiVersion[1]} is not available` }) : next();
  res.end();
});

app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('frontend/error');
});

module.exports = app;