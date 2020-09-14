var express = require('express');
const router = express.Router();

const uploadMulter = require('../midlewares/uploadEstudiante');
const uploadController = require('../controller/upController');
const passport = require('passport');

router.post('/uploadMulter', uploadMulter, uploadController.createMulter); /*Upload with multer*/

module.exports = router;