const { Router } = require('express');
const roleValidationMiddleware = require('../middleware/role-validation.middleware');
const userRouter = Router();
const userController = require('./user.controller');
const userRoles = require('./user.roles');
userRouter.get('/users', userController.getITStaff);
userRouter.get('/user/tickets', userController.getUserTickets);
// userRouter
//   .route('/user/ticket-aggregates')
//   .get(
//     roleValidationMiddleware(userRoles.IT_STAFF),
//     userController.getTicketAggregates
//   );
module.exports = userRouter;
