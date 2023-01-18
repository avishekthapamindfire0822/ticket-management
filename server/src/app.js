const express = require('express');
const errorController = require('./shared/error.controller');
const app = express();
app.use(errorController);
module.exports = app;
