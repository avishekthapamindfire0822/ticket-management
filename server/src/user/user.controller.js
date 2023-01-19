const asyncHandler = require('express-async-handler');
const userService = require('./user.service');
const getUserTickets = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const role = req.role;
  const tickets = await userService.getUserTickets(userId, role);
  res.status(200).json({
    data: tickets,
  });
});

const getTicketAggregates = asyncHandler(async (req, res) => {
  const ticketAggregates = await userService.getTicketAggregates();
  res.status(200).json({
    data: ticketAggregates,
  });
});

const getITStaff = asyncHandler(async (req, res) => {
  const staffMembers = await userService.getITStaff();
  res.status(200).json({
    data: staffMembers,
  });
});

module.exports = {
  getUserTickets,
  getTicketAggregates,
  getITStaff,
};
