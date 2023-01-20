const { Router } = require('express');
const roleValidationMiddleware = require('../middleware/role-validation.middleware');
const verifyAuth = require('../middleware/verify-auth.middleware');
const userRoles = require('../user/user.roles');
const ticketRouter = Router();
const ticketController = require('./ticket.controller');

ticketRouter.post('/tickets', ticketController.createTicket);
ticketRouter.use(verifyAuth);
ticketRouter.get('/tickets', ticketController.getTickets);
ticketRouter
  .route('/tickets/:ticketId')
  .put(
    roleValidationMiddleware(userRoles.IT_STAFF),
    ticketController.updateTicket
  )
  .delete(ticketController.deleteTicket);
ticketRouter.post(
  '/tickets/:ticketId/assign',
  roleValidationMiddleware(userRoles.IT_STAFF),
  ticketController.assignedTicket
);

ticketRouter.post(
  '/tickets/:ticketId/comments',
  roleValidationMiddleware(userRoles.IT_STAFF),
  ticketController.postCommentOnTicket
);

module.exports = ticketRouter;
