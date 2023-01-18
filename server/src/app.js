const express = require('express');
const errorController = require('./shared/error.controller');
const ticketRouter = require('./ticket/ticket.router');
const app = express();
app.use(express.json());
app.use(ticketRouter);
app.use(errorController);
module.exports = app;
