const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./auth/auth.router');
const errorController = require('./shared/error.controller');
const ticketRouter = require('./ticket/ticket.router');
var cors = require('cors');
const userRouter = require('./user/user.route');
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(authRouter);
app.use(ticketRouter);
app.use(userRouter);
app.use((req, res) => {
  res.status(404).json({
    message: 'Resource not found',
  });
});
app.use(errorController);
module.exports = app;
