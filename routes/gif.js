const express = require('express');
const gifController = require('../controllers/gifController');
const upload = require('../middelware/multerMid');


const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        mes: 'hi'
    })
})

router.post('/gifs', upload, gifController.addGif);


module.exports = router;
