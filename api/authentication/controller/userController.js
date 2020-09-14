const mongoose = require('mongoose');
const userModel = require('../model/userModel');
const fs = require('fs');
const uuid = require('uuid/v1');
const setting = require('../../../constants');

var listFunction = async function(req, res) {
    try {
        var list = await userModel.find({}).lean();
        res.status(200).json({ Status: 'OK', lista: list });
    } catch (e) {
        res.status(401).json({ Status: 'Failed', error: e });
    }
};

var ListOneFunction = async function(req, res) {
    try {
        var list = await userModel.findOne({ _id: req.params.id }).lean();
        res.status(200).json({ Status: 'OK', lista: list });
    } catch (e) {
        res.status(401).json({ Status: 'Failed', error: e });
    }
};

var updateFunction = async function(req, res) {
    try {
        var user = await userModel.findOne({ _id: req.params.id });
        user.set({
            username: req.body.username ? req.body.username : user.username,
            hash: req.body.hash ? req.body.hash : user.hash,
            salt: req.body.salt ? req.body.salt : user.salt,
            rol:req.body.rol ? req.body.rol : user.rol,
            image: req.file.path ? req.file.path : user.image
        });
        await user.save();
        res.status(200).json({ Status: 'OK', User: user });
    } catch (e) {
        res.status(401).json({ Status: 'Failed', error: e });
    }
};

var deleteFunction = async function(req, res) {
    try {
        var list = await userModel.findOne({ _id: req.params.id });
        const imagePath = list.image;
        fs.unlink(imagePath, e => {
            console.log(e);
        });
        var stats = await list.remove();
        res.status(200).json({ Status: 'OK', Stat: stats });
    } catch (e) {
        res.status(401).json({ Status: 'Failed', error: e });
    }
};

const uploadFunction = async function (req, res) { //express-fileupload function
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        var user = await userModel.findOne({_id:req.body.idUser});
        const file = req.files.img;
        const size = file.data.length;
        const extension = file.name.split('.')[file.name.split('.').length-1];
        const fileName = uuid()+'.'+extension;
        await file.mv(setting.UPLOAD_USER+user._doc.username+'/'+ fileName);

        if (user._doc.image){
            fs.unlink(user._doc.image, e => {
                console.log(e);
            });
        }
        user.set({image:setting.UPLOAD_USER+user._doc.username+'/'+ fileName});
        await user.save();
        res.status(200).json({success: true, msg: 'UploadOK'});

    } catch (err) {
        res.status(401).json({success: false, msg: err});
    }
};

var validateUser = async function(req,res){
    try {
        var user = await userModel.findOne({token:req.body.tokenUser});
        user.set({estado: "Valid"});
        await user.save();
        res.status(200).json({success: true, msg: `El usuario ${user._doc.username} ha sido validado`});
    }
    catch (err) {
        res.status(401).json({success: false, msg: err});
    }
};

module.exports.list = listFunction;
module.exports.listOne = ListOneFunction;
module.exports.update = updateFunction;
module.exports.delete = deleteFunction;
module.exports.uploadFoto = uploadFunction;
module.exports.validateUser = validateUser;