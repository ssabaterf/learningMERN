const mongoose = require('mongoose');
const User = require('../model/userModel')
const Rol = require('../model/rolModel')
const passport = require('passport');
const utils = require('../../../lib/utils');

var loginFunction = async function(req, res) {
    try {
        var user = await User.findOne({ username: req.body.username })

        if (!user) {
            res.status(401).json({ success: false, msg: "could not find user" });
        }

        // Function defined at bottom of app.js
        const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

        if (isValid) {

            const tokenObject = utils.issueJWT(user);

            res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });

        } else {

            res.status(401).json({ success: false, msg: "you entered the wrong password" });

        }
    } catch (err) {
        res.status(401).json({ success: false, msg: err });
    }
}
var registerFunction = async function(req, res) {
    try {
        const saltHash = utils.genPassword(req.body.password);

        const salt = saltHash.salt;
        const hash = saltHash.hash;

        var rol = await Rol.findOne({ rolname: req.body.rolname })
        const newUser = new User({
            username: req.body.username,
            hash: hash,
            salt: salt,
            rol: rol._id
        });

        await newUser.save()
        res.json({ success: true, user: newUser });

    } catch (err) {
        res.json({ success: false, msg: err });

    }

};

var makeRoles = async function(req, res) {

    var estudiante = {
        rolname: "estudiante",
        routes: [{ method: "GET", route: "/api/school/escuela" },
            { method: "GET", route: "/api/school/aula" }
        ]
    }
    var profesor = {
        rolname: "profesor",
        routes: [{ method: "GET,POST,PUT,DELETE", route: "/api/school/escuela" },
            { method: "GET,POST,PUT,DELETE", route: "/api/school/profesor" }
        ]
    }

    var estudianteDB = new Rol(estudiante);
    var profesorDB = new Rol(profesor);

    await estudianteDB.save()
    await profesorDB.save()
    res.status(200).json({ success: true, mssg: "Empingao" });
}
module.exports.login = loginFunction;
module.exports.register = registerFunction;
module.exports.roles = makeRoles;