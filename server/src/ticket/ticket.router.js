const { Router } = require('express');
const ticketRouter = Router();
const ticketController = require('./ticket.controller');
ticketRouter.post('/tickets', ticketController.createTicket);

module.exports = ticketRouter;
