const Ticket = require('../ticket/ticket.model');
const userRoles = require('./user.roles');

const getUserTickets = async (userId, role) => {
  if (role === userRoles.IT_STAFF) {
    return Ticket.find({});
  }
  return Ticket.find({
    submittedBy: userId,
  }).select('_id description createdAt updatedAt');
};

module.exports = {
  getUserTickets,
};
