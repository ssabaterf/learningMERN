const mongoose = require('mongoose');
//const fileUpload = require('express-fileupload');
//const path = require('path');
const util = require('util'); //para mover archivo
//const multer = require('multer');
const fs = require('fs');
//const Busboy = require('busboy');
//const os = require('os');
const formidable = require('formidable');

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
    try {
        console.log(req.file);
        // const newImage = {
        //     categoryImage : req.body.categoryImage
        // };
        // const data = new uploadModel(newImage);
        // await data.save();
        res.status(200).json({Status: 'OK', mssg: 'Upload image'});


    } catch (e) {
        res.status(401).json({Status: 'Failed', error: e});
    }
};

// const busboyFunction = async function (req, res) {
//     try {
//         const busboy = new Busboy({headers: req.headers});
//         const file = req.files.imageUp;
//         console.log(file);
//         await busboy.on('file', function () {
//             const saveTo = path.join(__dirname, '../../../public/images');
//             file.pipe(fs.createWriteStream(saveTo));
//         });
//         busboy.on('finish', function () {
//            res.writeHead(200, { 'Connection ' : 'close'});
//            res.end("That's all folks!");
//          });
//         req.pipe(busboy);
//         res.status(200).json({Status: 'OK'});
//     } catch (e) {
//         res.status(401).json({Status: 'Failed', error: e});
//     }
// };

const formidableFunction = async function (req, res) {
    const form = new formidable.IncomingForm();
    form.multiples = true;
    form.keepExtensions = true;
    form.uploadDir = "./public/images/";
    await form.parse(req, (err, fields, files) => {
        if (err) {
            res.json({result: 'failed', data: {}, msg: `cannot see image, Error is: : ${err}`});
        }
            const arrayOfFiles = files[""];
            if (arrayOfFiles.length > 0) {
                const fileNames = [];
                arrayOfFiles.forEach((eachFile) => {
                    fileNames.push(eachFile.path.split("/")[1]);
                });
                res.json({
                    result: 'ok',
                    data: fileNames,
                    numberOfImages: fileNames.length,
                    msg: 'Upload success image'
                });
            } else {
                res.json({result: 'failed', data: {}, msg: 'cannot see image'});
            }
        }
    );
};

module.exports.uploadExpress = uploadFunction;
module.exports.uploadFormidable = formidableFunction;
//module.exports.createMulter = createFunctionMulter;
//module.exports.uploadBusboy = busboyFunction;