const express = require('express');

const router = express.Router();
const articleController = require('../controllers/articleController');
const {checkAdmin, checkEmp } = require('../middelware/authChecker');


// router.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'am here'
//   });
// });

router.post('/', checkEmp, articleController.createArticles);
router.patch('/:articleId', checkEmp, articleController.updateArticles);

module.exports = router;