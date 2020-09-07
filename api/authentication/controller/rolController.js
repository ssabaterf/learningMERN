const mongoose = require('mongoose');
const Rol = require('../model/rolModel');
const passport = require('passport');
const utils = require('../../../lib/utils');

var makeRoles = async function (req, res) {

    var estudiante = {
        rolname: "estudiante",
        routes: [{method: "GET", route: "/api/school/escuela"},
            {method: "GET", route: "/api/school/aula"}
        ]
    };
    var profesor = {
        rolname: "profesor",
        routes: [{method: "GET,POST,PUT,DELETE", route: "/api/school/escuela"},
            {method: "GET,POST,PUT,DELETE", route: "/api/school/profesor"}
        ]
    };

    var estudianteDB = new Rol(estudiante);
    var profesorDB = new Rol(profesor);

    await estudianteDB.save();
    await profesorDB.save();
    res.status(200).json({success: true, mssg: "Empingao"});
};


var createFunction = async function (req, res) {
    try {
        var rolNew = {
            rolname: req.body.rolname,
        };
        if (req.body.routes)
            rolNew.routes = req.body.routes;

        var data = new Rol(rolNew);
        await data.save();
        res.status(200).json({Status: 'OK', mssg: 'Insertado correctamente'});
    } catch (e) {
        res.status(401).json({Status: 'Failed', error: e});
    }
};

var listFunction = async function (req, res) {
    try {
        var list = await Rol.find({}).lean();
        res.status(200).json({Status: 'OK', lista: list});
    } catch (e) {
        res.status(401).json({Status: 'Failed', error: e});
    }
};

var ListOneFunction = async function (req, res) {
    try {
        var list = await Rol.findOne({_id: req.params.id}).lean();
        res.status(200).json({Status: 'OK', lista: list});
    } catch (e) {
        res.status(401).json({Status: 'Failed', error: e});
    }
};

var updateFunction = async function (req, res) {
    try {
        var rol = await Rol.findOne({_id: req.params.id});
        rol.set({
            rolname: req.body.rolname ? req.body.rolname : estudiante.rolname,
            routes: req.body.routes ? req.body.routes : estudiante.routes,
        });
        await estudiante.save();
        res.status(200).json({Status: 'OK', Rol: rol});
    } catch (e) {
        res.status(401).json({Status: 'Failed', error: e});
    }
};

var deleteFunction = async function (req, res) {
    try {
        var list = await Rol.findOne({_id: req.params.id});
        var stats = await list.remove();
        res.status(200).json({Status: 'OK', Stat: stats});
    } catch (e) {
        res.status(401).json({Status: 'Failed', error: e});
    }
};

module.exports.create = createFunction;
module.exports.list = listFunction;
module.exports.listOne = ListOneFunction;
module.exports.update = updateFunction;
module.exports.delete = deleteFunction;
module.exports.roles = makeRoles;