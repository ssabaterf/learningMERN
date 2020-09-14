const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    rol: { type: mongoose.Schema.Types.ObjectId, ref: 'Rol' },
    image: String
}, { collection: 'user-data' });

module.exports = mongoose.model('User', UserSchema);