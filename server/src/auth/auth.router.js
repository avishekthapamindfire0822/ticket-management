const { Router } = require('express');
const authRouter = Router();
const authController = require('./auth.controller');
authRouter.post('/login', authController.loginUser);

module.exports = authRouter;
