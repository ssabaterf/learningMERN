var express = require('express');
var router = express.Router();

const rolController = require('../controller/rolController');

router.get('/roles', rolController.roles); /*Obtener el listado de roles*/
router.get('/:id', rolController.listOne); /*Obtener un rol*/
router.delete('/:id', rolController.delete); /*Eliminar  un rol*/
router.put('/:id', rolController.update); /*Actualizar un rol*/
router.post('/', rolController.create); /*Crear un rol*/
router.get('/', rolController.list);

module.exports = router;