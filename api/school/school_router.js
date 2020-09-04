var express = require('express');
var api_school = express();

var estudianteModule = require('./route/estudiante_router');

api_school.use('/estudiante', estudianteModule);

module.exports = api_school;