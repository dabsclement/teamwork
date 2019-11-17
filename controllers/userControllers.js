/* eslint-disable consistent-return */
const { check, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('../model/user');

exports.signup = async (req, res) => {
  const dataToValidate = [
    check(req.body.isAdmin).isBoolean(),
    check(req.body.firstName).isLength({ min: 3 }).isAlpha(),
    check(req.body.lastName).isLength({ min: 3 }),
    check(req.body.email).isEmail(),
    check(req.body.gender).isIn(['male', 'female']),
    check(req.body.jobRole).isLength({ min: 2 }),
    check(req.body.department).isLength({ min: 2 }),
    check(req.body.address).isLength({ min: 2 }),
    check(req.body.password).isLength({ min: 6 }),

  ];
  const errors = validationResult(dataToValidate);
  if (!errors.isEmpty()) {
    res.status(400).json({
      error: errors.msg
    });
    return res.status(201).json({
      message: 'all data has passed validation'
    });
  }
  const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));
  const newUser = {
    isadmin: false,
    firstname: req.body.firstName,
    lastname: req.body.lastName,
    email: req.body.email,
    gender: req.body.gender,
    jobrole: req.body.jobRole,
    department: req.body.department,
    address: req.body.address,
    password: hash,
  };
  console.log(newUser);
  const token = jwt.sign({ newUser }, process.env.secretKey, { expiresIn: '1hr' });
  try {
    const save = await userModel.addUser(newUser);
    if (save) {
      res.status(200).json({
        status: 'success',
        token,
        message: 'User account successfully created',
        data: save.rows
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: `error ${error} occured when trying to sign up`
    });
  }
};

exports.signin = async (req, res) => {
  const dataToValidate = [
    check(req.body.email).isEmail(),
    check(req.body.passord).isLength({ min: 6 }),
  ];
  const errors = validationResult(dataToValidate);
  if (!errors.isEmpty()) {
    res.status(400).json({ message: 'incorrect format of parameter' });
  }
  const loginDetails = {
    email: req.body.email,
    password: req.body.password

  };
  console.log(loginDetails);
  try {
    await userModel.getUser(loginDetails.email)
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            message: 'user not found'
          });
        }
        bcrypt.compare(req.body.password, user.rows[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: 'incorrect password'
            });
          }
          if (result) {
            const token = jwt.sign({
              email: user.rows[0].eamil,
              password: user.rows[0].id,
            }, process.env.secretKey, { expiresIn: '1hr' });
            return res.status(201).json({
              message: 'login successful',
              token,
              data: {
                id: user.rows[0].id,
                firstName: user.rows[0].firstName,
                lastName: user.rows[0].lastName
              }
            });
          }
          res.status(401).json({
            message: 'auth failed;'
          });
        });
      })
      .catch((error) => {
        console.log('i am here');
        res.status(500).json({
          error: error
        });
      });
  } catch (err) {
    console.log('i am the errorrrrr');
    throw err;
  }
};
