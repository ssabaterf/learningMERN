const express = require('express');
const api_up = express();

const upController = require('./router/upRouter');

api_up.use('/upload', upController);

module.exports = api_up;