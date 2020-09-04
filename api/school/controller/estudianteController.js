const estudianteModel = require('../model/estudianteModel');

var createFunction = async function (req, res) {
    try {
        estudianteNew = {
            nombre: req.body.nombre,
            edad: req.body.edad,
        };
        if (req.body.notas)
            estudianteNew.notas = req.body.notas;

        var data = new estudianteModel(estudianteNew);
        await data.save();
        res.status(200).json({Status: 'OK', mssg: 'Insertado correctamente'});
    }
    catch (e) {
        res.status(401).json({Status: 'Failed', error: e});
    }
};

var listFunction = async function (req, res) {
    try {
        var list = await estudianteModel.find({}).lean();
        res.status(200).json({Status: 'OK', lista: list});
    }
    catch (e) {
        res.status(401).json({Status: 'Failed', error: e});
    }
};

var ListOneFunction = async function (req, res) {
    try {
        var list = await estudianteModel.findOne({_id:req.params.id}).lean();
        res.status(200).json({Status: 'OK', lista: list});
    }
    catch (e) {
        res.status(401).json({Status: 'Failed', error: e});
    }
};

var updateFunction = async function (req, res) {
    try {
        var estudiante = await estudianteModel.findOne({_id:req.params.id});
        estudiante.set({
            nombre: req.body.nombre? req.body.nombre:estudiante.nombre,
            edad: req.body.edad? req.body.edad:estudiante.edad,
            notas: req.body.notas? req.body.notas:estudiante.notas,
        });
        await estudiante.save();
        res.status(200).json({Status: 'OK', Est: estudiante});
    }
    catch (e) {
        res.status(401).json({Status: 'Failed', error: e});
    }
};

var deleteFunction = async function (req, res) {
    try {
        var list = await estudianteModel.findOne({_id:req.params.id});
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
