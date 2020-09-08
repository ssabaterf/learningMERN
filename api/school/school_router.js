var express = require('express');
const passport = require('passport');
const validateRoute = require('../../passport/validateRole');
var api_school = express();

var estudianteModule = require('./route/estudiante_router');
var escuelaModule = require('./route/escuela_router');

api_school.use('/estudiante', estudianteModule);
api_school.use('/escuela', passport.authenticate('jwt', { session: false }), validateRoute.isValidLogin, escuelaModule);

module.exports = api_school;