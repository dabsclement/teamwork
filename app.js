/* eslint-disable consistent-return */
// import express from 'express';
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const url = require('url');
const hpp = require('hpp');
const userRoutes = require('./routes/user');
const gifRoutes = require('./routes/gif');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors());
app.use(hpp());
app.use(helmet());

// this is to prevent CORS errors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
app.use('/api/v1/auth/', userRoutes);
app.use('/api/v1/gif/', gifRoutes);

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


module.exports = app;
