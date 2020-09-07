var express = require('express');
var api_auth = express();

var authController = require('./router/auth_router');
var rolController = require('./router/rol_router');
var userController = require('./router/user_router');

api_auth.use('/auth', authController);
api_auth.use('/rol',  rolController);
api_auth.use('/user', userController);

module.exports = api_auth;