var express = require('express');
const router = express.Router();

//const uploadMulter = require('../midlewares/uploads');
const uploadController = require('../controller/upController');
const passport = require('passport');

//router.post('/uploadExpress', uploadController.uploadExpress); /*Upload with express-fileupload*/
//router.post('/uploadMulter', uploadMulter, uploadController.createMulter); /*Upload with multer*/
//router.post('/uploadBusboy', uploadController.uploadBusboy);
router.post('/uploadFormidable', uploadController.uploadFormidable);

module.exports = router;