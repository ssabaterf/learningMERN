var express = require('express');
var router = express.Router();

const rolController = require('../controller/rolController');

router.get('/roles', rolController.roles); /*Obtener el listado de las escuelas*/

module.exports = router;