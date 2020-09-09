const express = require('express');
const api = express();

/* Rutas api */

const schoolModule = require('./school/school_router');
const authModule = require('./authentication/api_auth');
const uploadModule = require('./upload/api_up');

api.use('/upload', uploadModule);
api.use('/school', schoolModule);
api.use('/auth', authModule);

module.exports = api;