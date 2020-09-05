var express = require('express');
var api_school = express();

var estudianteModule = require('./route/estudiante_router');
var escuelaModule = require('./route/escuela_router');

api_school.use('/estudiante', estudianteModule);
api_school.use('/escuela', escuelaModule);

module.exports = api_school;