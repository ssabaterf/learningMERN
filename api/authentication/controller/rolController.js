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
    }
    var profesor = {
        rolname: "profesor",
        routes: [{method: "GET,POST,PUT,DELETE", route: "/api/school/escuela"},
            {method: "GET,POST,PUT,DELETE", route: "/api/school/profesor"}
        ]
    }

    var estudianteDB = new Rol(estudiante);
    var profesorDB = new Rol(profesor);

    await estudianteDB.save()
    await profesorDB.save()
    res.status(200).json({success: true, mssg: "Empingao"});
}

module.exports.roles = makeRoles;