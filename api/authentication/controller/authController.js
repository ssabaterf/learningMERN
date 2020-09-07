const mongoose = require('mongoose');
const User = require('../model/userModel');
const Rol = require('../model/rolModel');
const passport = require('passport');
const utils = require('../../../lib/utils');

var loginFunction = async function (req, res) {
    try {
        var user = await User.findOne({username: req.body.username});

        if (!user) {
            res.status(401).json({msg: "could not find user"});
        }
        // Function defined at bottom of app.js
        const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

        if (isValid) {

            const tokenObject = utils.issueJWT(user);

            res.status(200).json({success: true, token: tokenObject.token, expiresIn: tokenObject.expires});

        } else {
            res.status(401).json({success: false, msg: "you entered the wrong password"});
        }
    } catch (err) {
        res.status(401).json({success: false, msg: err});
    }
};

var registerFunction = async function (req, res) {
    try {

        const saltHash = utils.genPassword(req.body.password);
        const salt = saltHash.salt;
        const hash = saltHash.hash;

        var rol = await Rol.findOne({rolname: req.body.rolname});
        if (!req.isAuthenticated() && rol.rolname == "estudiante") {

            const newUser = new User({
                username: req.body.username,
                hash: hash,
                salt: salt,
                rol: rol._id
            });
            await
                newUser.save();
            res.json({success: true, user: newUser});
        }
        else if (req.isAuthenticated()) {

            res.status(200).json({success: true, msg: "you are register"});

            const saltHash = utils.genPassword(req.body.password);
            const salt = saltHash.salt;
            const hash = saltHash.hash;

            var rol = await Rol.findOne({rolname: req.body.rolname});
            const newUser = new User({
                username: req.body.username,
                hash: hash,
                salt: salt,
                rol: rol._id
            });
            await newUser.save();
        }
        else
            res.status(401).json({success: false, msg: "you are not register "});

    } catch (err) {
        res.json({success: false, msg: err});
    }
};

module.exports.login = loginFunction;
module.exports.register = registerFunction;