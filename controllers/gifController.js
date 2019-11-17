/* eslint-disable consistent-return */
const { check, validationResult } = require('express-validator');
require('dotenv').config();
const gifModel = require('../model/gif');
const getLogUser = require('../middelware/getLogUser');


exports.addGif = async (req, res) => {
  const file = req.file;
//   console.log(file);
//   console.log(req.body.title);

  const dataToValidate = [
    check(req.body.title).isLength({ min: 3 }),
    check(file.originalname).isLength({ min: 3 }).isMimeType('image/gif'),

  ];
  const errors = validationResult(dataToValidate);
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: 'data validation didnt pass'
    });
    return res.status(200).json({
      message: 'All data pass validation test'
    });
  }
  const userid = await getLogUser(req);
  console.log(userid);
  const newGif = {
    title: req.body.title,
    imageurl: file.path,
    public_id: file.path,
    userid
  };
  console.log(newGif);
  try {
    console.log('tring to pull of oooo');

    const result = await gifModel.gifPost(newGif);
    console.log('tring to pull of');
    if (result) {
      console.log(result.rows[0]);
      return res.status(201).json({
        status: 'success',
        data: {
          gifId: result.rows[0].gifId,
          message: 'gif successfully uploaded',
          createdOn: result.rows[0].dateCreated,
          title: result.rows[0].title,
          imageurl: result.rows[0].imageurl,
          public_id: result.rows[0].public_id,
          userid: result.rows[0].userid
        }
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'i dey here',
      error
    });
  }
};
