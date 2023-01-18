const Ticket = require('../ticket/ticket.model');
const userRoles = require('./user.roles');

const getUserTickets = async (userId, role) => {
  if (role === userRoles.IT_STAFF) {
    return Ticket.find({}).populate(
      'submittedBy',
      'firstName lastName emailId'
    );
  }
  return Ticket.find({
    submittedBy: userId,
  })
    .populate('submittedBy')
    .select('_id description createdAt updatedAt');
};

module.exports = {
  getUserTickets,
};
