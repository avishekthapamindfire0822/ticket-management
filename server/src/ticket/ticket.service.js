const NotFoundException = require('../shared/exception/NotFoundException');
const User = require('../user/user.model');
const Ticket = require('./ticket.model');
const ticketStatus = require('./ticket.status');
const mongoose = require('mongoose');
const createTicket = async (ticketDto, submittedBy) => {
  const user = await User.findOne({ emailId: submittedBy });
  const newTicket = new Ticket({
    submittedBy: user,
    ...ticketDto,
  });
  return newTicket.save();
};

const updateTicket = async (ticketId) => {
  const _id = mongoose.Types.ObjectId(ticketId);
  const ticket = await Ticket.findById(_id);
  if (!ticket) {
    throw new NotFoundException(`Ticket with id ${ticketId} not available`);
  }
  if (ticket.status === ticketStatus.FIXED) {
    return {
      message: 'Ticket is already resolved',
    };
  }
  ticket.status = ticketStatus.FIXED;
  return ticket.save();
};

const deleteTicket = async (ticketId) => {
  const _id = mongoose.Types.ObjectId(ticketId);
  return Ticket.findByIdAndRemove(_id);
};

module.exports = {
  createTicket,
  updateTicket,
  deleteTicket,
};
