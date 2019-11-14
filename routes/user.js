const express = require('express');

const router = express.Router();

const userController = require('../controllers/userControllers');

router.post('/create-user', userController.signup);
router.post('/signin', userController.signin);

module.exports = router;
