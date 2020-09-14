const multer = require('multer');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid/v1');

//Upload multer method
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../../public/user'),
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, uuid() + '.' + file.originalname)
    }
});

const upload = multer({storage}).single('image');

module.exports = upload;
