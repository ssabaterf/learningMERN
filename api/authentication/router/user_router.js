var express = require('express');
var router = express.Router();

const userController = require('../controller/userController');

router.get('/', userController.list); /*Obtener el listado de un usuario*/
router.get('/:id', userController.listOne); /*Obtener un usuario*/
router.delete('/:id', userController.delete); /*Eliminar  un usuario*/
router.put('/:id', userController.update); /*Actualizar un usuario*/
router.post('/upload', userController.uploadFoto); /*Actualizar un usuario*/
router.post('/validate', userController.validateUser); /*Actualizar un usuario*/

module.exports = router;