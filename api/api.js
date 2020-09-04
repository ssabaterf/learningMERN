var express = require('express');
var api = express();

/* Rutas api */

var schoolModule = require('./school/school_router');

api.use('/school', schoolModule);

module.exports = api;