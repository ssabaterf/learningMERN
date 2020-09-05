var express = require('express');
var router = express.Router();

const estudianteController = require('../controller/estudianteController');

router.post('/', estudianteController.create); /*Crear un programa turistico*/
router.get('/', estudianteController.list); /*Obtener el listado de un programa turistico*/
router.get('/:id', estudianteController.listOne); /*Obtener un programa turistico*/
router.delete('/:id', estudianteController.delete); /*Eliminar  un programa turistico*/
router.put('/:id', estudianteController.update); /*Actualizar un programa turistico*/

module.exports = router;