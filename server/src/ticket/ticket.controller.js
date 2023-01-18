const asyncHandler = require('express-async-handler');
const ticketService = require('./ticket.service');
const createTicket = asyncHandler(async (req, res) => {
  const { submittedBy, ticketDetail: ticketDto } = req.body;
  const ticket = await ticketService.createTicket(ticketDto, submittedBy);
  res.status(201).json({
    data: ticket,
  });
});

module.exports = {
  createTicket,
};
