const asyncHandler = require('express-async-handler');
const ticketService = require('./ticket.service');
const createTicket = asyncHandler(async (req, res) => {
  const { description, about, firstName, lastName, emailId, title } = req.body;
  const ticket = await ticketService.createTicket({
    firstName,
    lastName,
    emailId,
    description,
    about,
    title,
  });
  res.status(201).json({
    data: ticket,
  });
});

const updateTicket = asyncHandler(async (req, res) => {
  const { ticketId } = req.params;
  const { status } = req.body;
  await ticketService.updateTicket(ticketId, status);
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

const postCommentOnTicket = asyncHandler(async (req, res) => {
  const { comment } = req.body;
  const { ticketId } = req.params;
  const commentDoc = await ticketService.postCommentOnTicket({
    userId: req.userId,
    comment,
    ticketId,
  });
  res.status(200).json({
    data: commentDoc,
  });
});

const assignedTicket = asyncHandler(async (req, res) => {
  const { emailId } = req.body;
  const { ticketId } = req.params;
  const result = await ticketService.assignedTicket(ticketId, emailId);
  res.status(201).json({
    data: result,
  });
});

const getTickets = asyncHandler(async (req, res) => {
  const tickets = await ticketService.getTickets();
  res.json({
    data: tickets,
  });
});

const getTicketAggregates = asyncHandler(async (req, res) => {
  const ticketAggregates = await ticketService.getTicketAggregates();
  res.status(200).json({
    data: ticketAggregates,
  });
});

module.exports = {
  createTicket,
  updateTicket,
  deleteTicket,
  postCommentOnTicket,
  assignedTicket,
  getTickets,
  getTicketAggregates,
};
