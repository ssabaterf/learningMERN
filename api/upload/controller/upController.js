const mongoose = require('mongoose');
//const fileUpload = require('express-fileupload');
const path = require('path');
const util = require('util'); //para mover archivo
const multer = require('multer');
const fs = require('fs');
const uploadModel = require('../model/uploadModel');

const uploadFunction = async function (req, res) {
    try {
        const file = req.files.element2;
        const fileName = file.name;
        const size = file.data.length;
        const extension = path.join(fileName);

        await file.mv("public/images/" + fileName);
        res.status(200).json({success: true, msg: 'UploadOK'});

    } catch (err) {
        res.status(401).json({success: false, msg: err});
    }
};


const createFunctionMulter = async function (req, res) {
    try{
        console.log(req.files);
        // const newImage = {
        //     categoryImage : req.body.categoryImage
        // };
        // const data = new uploadModel(newImage);
        // await data.save();
        res.status(200).json({ Status: 'OK', mssg: 'Upload image' });


    } catch (e) {
        res.status(401).json({ Status: 'Failed', error: e });
    }
};

const deleteFunction = async function(req, res) {
    try {
        const list = await uploadModel.findOne({ _id: req.params.id });
        const stats = await list.remove();
        res.status(200).json({ Status: 'OK', Stat: stats });
    } catch (e) {
        res.status(401).json({ Status: 'Failed', error: e });
    }
};

module.exports.uploadExpress = uploadFunction;
module.exports.createMulter = createFunctionMulter;
//module.exports.delete = deleteFunction;