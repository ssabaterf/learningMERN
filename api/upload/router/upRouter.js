var express = require('express');
const router = express.Router();

const upController = require('../controller/upController');
const passport = require('passport');

router.post('/upload', upController.upload); /*Upload*/

module.exports = router;