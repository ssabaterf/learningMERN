const escuelaModel = require('../model/escuelaModel');

var createFunction = async function (req, res) {
    try {
        var escuelaNew = {
            nombre: req.body.nombre,
            capacidad: req.body.capacidad,
            direccion: req.body.direccion,
            nivelEducacion: req.body.nivelEducacion,
        };
        if (req.body.carreras)
            escuelaNew.carreras = req.body.carreras;
        if (req.body.profesores)
            escuelaNew.profesores = req.body.profesores;

        var data = new escuelaModel(escuelaNew);
        await data.save();
        res.status(200).json({Status: 'OK', mssg: 'Insertado correctamente'});
    }
    catch (e) {
        res.status(401).json({Status: 'Failed', error: e});
    }
};


var listFunction = async function (req, res) {
    try {
        var list = await escuelaModel.find({}).lean();
        res.status(200).json({Status: 'OK', lista: list});
    }
    catch (e) {
        res.status(401).json({Status: 'Failed', error: e});
    }
};

var ListOneFunction = async function (req, res) {
    try {
        var list = await escuelaModel.findOne({_id:req.params.id}).lean();
        res.status(200).json({Status: 'OK', lista: list});
    }
    catch (e) {
        res.status(401).json({Status: 'Failed', error: e});
    }
};

var updateFunction = async function (req, res) {
    try {
        var escuela = await escuelaModel.findOne({_id:req.params.id});
        escuela.set({
            nombre: req.body.nombre? req.body.nombre:escuela.nombre,
            capacidad: req.body.capacidad? req.body.capacidad:escuela.capacidad,
            nivelEducacion: req.body.nivelEducacion? req.body.nivelEducacion:escuela.nivelEducacion,
            direccion: req.body.direccion? req.body.direccion:escuela.direccion,
            carreras: req.body.carreras? req.body.carreras:escuela.carreras,
            profesores: req.body.profesores? req.body.profesores:escuela.profesores,
        });
        await escuela.save();
        res.status(200).json({Status: 'OK', Esc: escuela});
    }
    catch (e) {
        res.status(401).json({Status: 'Failed', error: e});
    }
};

var deleteFunction = async function (req, res) {
    try {
        var list = await escuelaModel.findOne({_id:req.params.id});
        var stats = await list.remove();
        res.status(200).json({Status: 'OK', Stat: stats});
    }
    catch (e) {
        res.status(401).json({Status: 'Failed', error: e});
    }
};

module.exports.create = createFunction;
module.exports.list = listFunction;
module.exports.listOne = ListOneFunction;
module.exports.update = updateFunction;
module.exports.delete = deleteFunction;

