const asyncHandler = require('express-async-handler');
const ticketService = require('./ticket.service');
const createTicket = asyncHandler(async (req, res) => {
  const { description, about } = req.body;
  const ticket = await ticketService.createTicket(
    { description, about },
    req.emailId
  );
  res.status(201).json({
    data: ticket,
  });
});

const updateTicket = asyncHandler(async (req, res) => {
  const { ticketId } = req.params;
  const updatedTicket = await ticketService.updateTicket(ticketId);
  res.status(204).json({
    data: {
      message: 'Ticket updated successfully',
    },
  });
});

const deleteTicket = asyncHandler(async (req, res) => {
  const { ticketId } = req.params;
  await ticketService.deleteTicket(ticketId);
  res.status(204).json();
});

module.exports = {
  createTicket,
  updateTicket,
  deleteTicket,
};
