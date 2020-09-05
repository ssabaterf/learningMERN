var express = require('express');
var router = express.Router();

const escuelaController = require('../controller/escuelaController');

router.post('/', escuelaController.create); /*Crear escuela*/
router.get('/', escuelaController.list); /*Obtener el listado de las escuelas*/
router.get('/:id', escuelaController.listOne); /*Obtener una escuela*/
router.delete('/:id', escuelaController.delete); /*Eliminar  una escuela*/
router.put('/:id', escuelaController.update); /*Actualizar una escuela*/

module.exports = router;