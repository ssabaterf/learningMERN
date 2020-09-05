var express = require('express');
var api_auth = express();

var authController = require('./router/auth_router');

api_auth.use('/auth', authController);


module.exports = api_auth;