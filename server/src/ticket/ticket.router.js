const { Router } = require('express');
const ticketRouter = Router();
const ticketController = require('./ticket.controller');
ticketRouter.post('/tickets', ticketController.createTicket);
ticketRouter.route('/tickets/:ticketId').patch(ticketController.updateTicket);

module.exports = ticketRouter;
