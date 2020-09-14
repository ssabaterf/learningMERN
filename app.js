var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
cors = require('cors');
var mongoose = require('mongoose');
const fs = require('fs');
const fileUpload = require('express-fileupload');

var apiRouter = require('./api/api');
require('./passport/config')(passport);
var configProject =  require('./constants.js');

mongoose.connect(configProject.MONGODB_URI)
    .then(x => { console.log('Success MongoDB') })
    .catch(x => console.error(x));



const app = express();
app.use(fileUpload({
    limits: { fileSize: configProject.MAX_SIZE_FILE_MB * 1024 * 1024 },
    abortOnLimit: true,
    createParentPath: true,}));

app.use(cors());
app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.header("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.header('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    if (req.file){
        fs.unlink(req.file.path, (err) => {
            console.log(err);
        })
    }
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;