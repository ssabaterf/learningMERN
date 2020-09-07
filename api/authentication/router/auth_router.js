var express = require('express');
var router = express.Router();

const authController = require('../controller/authController');

router.post('/login', authController.login); /*Crear escuela*/
router.post('/register', authController.register); /*Obtener el listado de las escuelas*/

module.exports = router;