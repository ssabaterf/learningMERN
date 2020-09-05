var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var escuelaModelSchema = new Schema({
    nombre: {type: String, required: true},
    capacidad: Number,
    nivelEducacion: String,
    carreras: [String],
    direccion: String,
    profesores: [{ nombre: String, edad: Number, grado: String}]
}, {collection: 'escuela-data'});

module.exports = mongoose.model('escuelaModel', escuelaModelSchema);