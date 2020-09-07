var express = require('express');
var api = express();

/* Rutas api */

var schoolModule = require('./school/school_router');
var authModule = require('./authentication/api_auth');

api.use('/school', schoolModule);
api.use('/auth', authModule);

module.exports = api;