const mongoose = require('mongoose');
const User = require('../model/userModel');
const Rol = require('../model/rolModel');
const utils = require('../../../lib/utils');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jaleonp93@gmail.com',
        pass: 'jantoniolp93'
    }
});

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

var registerStudent = async function (req, res) {
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
                rol: rol._id,
                image: req.file.path
            });
            const mailOptions = {
                from: 'jaleonp93@gmail.com',
                to: 'jaleonp93@gmail.com',
                subject: 'Sending Email using Node.js',
                text: 'That was easy!'
            };
           await transporter.sendMail(mailOptions, err =>{
               console.log(err);
            });

            await
                newUser.save();
            res.status(200).json({success: true, user: newUser});
        }
    } catch (err) {
        res.status(401).json({success: false, Status: 'your user not exists, please log-in', msg: err});
    }
};

var registerFunction = async function (req, res) {
    try {
        const saltHash = utils.genPassword(req.body.password);
        const salt = saltHash.salt;
        const hash = saltHash.hash;

        var rol = await Rol.findOne({rolname: req.body.rolname});
        const newUser = new User({
            username: req.body.username,
            hash: hash,
            salt: salt,
            rol: rol._id,
            image: req.file.path
        });
            const mailOptions = {
            from: 'jaleonp93@gmail.com',
            to: 'jaleonp93@gmail.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };
        await transporter.sendMail(mailOptions, err =>{
            console.log(err);
        });
        await newUser.save();
        res.status(200).json({success: true, user: newUser, msg: "new user created"});

    } catch (e) {
        res.status(401).json({Status: 'your user not exists, please log-in', error: e});
    }
};

module.exports.login = loginFunction;
module.exports.register = registerStudent;
module.exports.registerSecure = registerFunction;