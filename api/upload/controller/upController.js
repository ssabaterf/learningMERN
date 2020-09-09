const mongoose = require('mongoose');
const Busboy = require('busboy');

const uploadFunction = async function (req, res) {
    try {
        const element1 = req.body.element1;

        const busboy = new Busboy({headers: req.headers});

        // The file upload has completed
        await busboy.on('finish', function () {
            console.log('Upload finished');

            // Your files are stored in req.files. In this case,
            // you only have one and it's req.files.element2:
            // This returns:
            // {
            //    element2: {
            //      data: ...contents of the file...,
            //      name: 'Example.jpg',
            //      encoding: '7bit',
            //      mimetype: 'image/png',
            //      truncated: false,
            //      size: 959480
            //    }
            // }

            // Grabs your file object from the request.
            const file = req.files.element2;
            console.log(file);

        });

        await req.pipe(busboy);
        //res.status(200).json({success: true,});

    } catch (err) {
        res.status(401).json({success: false, msg: err});
    }
};

module.exports.upload = uploadFunction;