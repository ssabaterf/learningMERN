const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    rol: { type: mongoose.Schema.Types.ObjectId, ref: 'Rol' },
    email: String,
    token: String,
    estado: String,
    image: String
}, { collection: 'user-data' });

module.exports = mongoose.model('User', UserSchema);