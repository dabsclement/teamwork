const { check, validationResult } = require('express-validator');
const moment = require('moment');
const articleModel = require('../model/articles');
const getLogUser = require('../middelware/getLogUser');

exports.createArticles = async (req, res) => {
  const dataToValidate = [
    check(req.body.title).isLength({ min: 3 }),
    check(req.body.content).isLength({ min: 25 })
  ];
  const error = validationResult(dataToValidate);
  if (!error.isEmpty()) {
    res.status(400).json({
      status: 'error',
      message: 'you title or content is not up to the required min length'
    });
  }
  const userid = await getLogUser(req);
  console.log(userid);
  const article = {
    title: req.body.title,
    content: req.body.content,
    userid
  };
  try {
    const result = await articleModel.articlePost(article);
    if (result) {
      console.log(result.rows[0]);
      return res.status(201).json({
        status: 'Success',
        data: {
          articleid: result.rows[0].articleid,
          message: 'Article succesfully posted',
          title: result.rows[0].title,
          content: result.rows[0].content,
          dataCreated: moment(result.rows[0].dateCreated),
          userid: moment(result.rows[0].dataUpdated)

        }
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `error ${error} occured`
    });
  }
};