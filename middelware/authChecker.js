/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const userModel = require('../model/user');


const checkAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, process.env.secretKey);
    const userMail = decode.email;
    const { rows } = await userModel.getUser(userMail);
    if (rows[0].isadmin === true) {
      next();
      const authDetails = { token: userMail, isAdmin: rows[0].isadmin };
      return authDetails;
    }
    res.status(401).json({
      message: 'you are not an admin so you cant perform this operation'
    });
  } catch (err) {
    res.status(500).json({
      message: err
    });
  }
};

const checkEmp = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, process.env.secretKey);
    const userMail = decode.email;
    const { rows } = await userModel.getUser(userMail);
    console.log(rows);
    if (rows[0].email !== userMail) {
      res.status(401).json({
        message: 'you are not an employee in this company'
      });
    }
    next();
  } catch (err) {
    res.status(500).json({
      hell: 'hell',
      message: err
    });
  }
};

module.exports = { checkAdmin, checkEmp };
