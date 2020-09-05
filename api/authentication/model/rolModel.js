const mongoose = require('mongoose');

const RolSchema = new mongoose.Schema({
    rolname: String,
    routes: [{ method: String, route: String }]
}, { collection: 'rol-data' });

module.exports = mongoose.model('Rol', RolSchema);