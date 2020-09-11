const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageModelSchema = new Schema({
    categoryImage: {type: String, required: true},
}, {collection: 'image-data'});

module.exports = mongoose.model('imageModel', ImageModelSchema);
