const express = require('express');

const router = express.Router();
const articleController = require('../controllers/articleController');


// router.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'am here'
//   });
// });

router.post('/', articleController.createArticles);

module.exports = router;