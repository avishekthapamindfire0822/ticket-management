const { Router } = require('express');
const ticketRouter = Router();
const ticketController = require('./ticket.controller');
ticketRouter.post('/tickets', ticketController.createTicket);
ticketRouter
  .route('/tickets/:ticketId')
  .patch(ticketController.updateTicket)
  .delete(ticketController.deleteTicket);

module.exports = ticketRouter;
