const { Router } = require('express');
const userRouter = Router();
const userController = require('./user.controller');
userRouter.get('/user/tickets', userController.getUserTickets);

module.exports = userRouter;
