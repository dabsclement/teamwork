/* eslint-disable consistent-return */
const { check, validationResult } = require('express-validator');
require('dotenv').config();
const gifModel = require('../model/gif');
const getLogUser = require('../middelware/getLogUser');
const cloudStorage = require('../middelware/cloud-config');

exports.addGif = async (req, res) => {
  const file = req.files.image;
  // console.log(file);
  // console.log(req.body.title);

  const dataToValidate = [
    check(req.body.title).isLength({ min: 3 }),
    check(file.name).isLength({ min: 3 }).isMimeType('image/gif'),

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
  if (file.mimetype !== 'image/gif') {
    return res.status(400).json({
      message: 'please we only accept gif'
    });
  }
  const userid = await getLogUser(req);
  console.log(userid)
  const image = await cloudStorage.uploader.upload(file.tempFilePath, (error, result) => {
    if (error) {
      res.status(400).json({ message: `${error} occured` });
    }
    return result;
  });
  const newGif = {
    title: req.body.title,
    imageurl: image.secure_url,
    public_id: image.public_id,
    userid
  };
  console.log(newGif);
  try {
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
          public_url: result.rows[0].public_id,
          userid: result.rows[0].userid
        }
      });
    }
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'i dey here',
      error
    });
  }
};