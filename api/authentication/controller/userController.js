const mongoose = require('mongoose');
const userModel = require('../model/userModel');
const rolModel = require('../model/rolModel');
const passport = require('passport');
const utils = require('../../../lib/utils');
const fs = require('fs');

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

module.exports.list = listFunction;
module.exports.listOne = ListOneFunction;
module.exports.update = updateFunction;
module.exports.delete = deleteFunction;