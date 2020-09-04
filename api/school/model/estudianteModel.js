var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var estudianteModelSchema = new Schema({
    nombre: {type: String, required: true},
    edad: Number,
    notas: [Number]
}, {collection: 'estudiante-data'});

module.exports = mongoose.model('estudianteModel', estudianteModelSchema);
