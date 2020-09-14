const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const os = require('os');

const createFunctionMulter = async function (req, res) {
    try {
        console.log(req.file);
        // const newImage = {
        //     categoryImage : req.body.categoryImage
        // };
        // const data = new uploadModel(newImage);
        // await data.save();
        res.status(200).json({Status: 'OK', mssg: 'Upload image'});
    } catch (e) {
        res.status(401).json({Status: 'Failed', error: e});
    }
};

module.exports.createMulter = createFunctionMulter;