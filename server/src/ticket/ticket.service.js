const User = require('../user/user.model');
const Ticket = require('./ticket.model');

const createTicket = async (ticketDto, submittedBy) => {
  const user = await User.findOne({ emailId: submittedBy });
  const newTicket = new Ticket({
    submittedBy: user,
    ...ticketDto,
  });
  return newTicket.save();
};

module.exports = {
  createTicket,
};
