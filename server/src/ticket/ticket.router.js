const { Router } = require('express');
const roleValidationMiddleware = require('../middleware/role-validation.middleware');
const verifyAuth = require('../middleware/verify-auth.middleware');
const userRoles = require('../user/user.roles');
const ticketRouter = Router();
const ticketController = require('./ticket.controller');
ticketRouter.use(verifyAuth);
ticketRouter.post('/tickets', ticketController.createTicket);
ticketRouter
  .route('/tickets/:ticketId')
  .patch(
    roleValidationMiddleware(userRoles.IT_STAFF),
    ticketController.updateTicket
  )
  .delete(ticketController.deleteTicket);

module.exports = ticketRouter;
