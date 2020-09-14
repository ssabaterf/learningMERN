var express = require('express');
var router = express.Router();

const authController = require('../controller/authController');
const passport = require('passport');
const uploadMulter = require('../../upload/midlewares/uploadUser');

router.post('/login', authController.login); /*Login*/
router.post('/register', authController.register); /*Registrar*/
router.post('/registerSecure', passport.authenticate('jwt', { session: false }), uploadMulter, authController.registerSecure);

module.exports = router;