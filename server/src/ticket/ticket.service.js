const NotFoundException = require('../shared/exception/NotFoundException');
const User = require('../user/user.model');
const Ticket = require('./ticket.model');
const ticketStatus = require('./ticket.status');
const mongoose = require('mongoose');
const ForbiddenException = require('../shared/exception/ForbiddenException');
const createTicket = async (ticketDto, submittedBy) => {
  const user = await User.findOne({ emailId: submittedBy });
  const newTicket = new Ticket({
    submittedBy: user,
    ...ticketDto,
  });
  return (await newTicket.save()).populate(
    'submittedBy',
    '_id firstName lastName emailId'
  );
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

const postCommentOnTicket = async ({ userId, ticketId, comment }) => {
  if (!comment) {
    throw new ForbiddenException('Please provide comment');
  }
  const _userId = mongoose.Types.ObjectId(userId);
  const _ticketId = mongoose.Types.ObjectId(ticketId);
  const ticket = await Ticket.findById(_ticketId);
  if (!ticket) {
    throw new NotFoundException(`Ticket with ${ticketId} not available`);
  }

  const user = await User.findById(_userId).select(
    '_id firstName lastName emailId'
  );
  ticket.comments.push({
    author: user,
    content: comment,
  });
  return await await await (await ticket.save()).populate('comments');
};

module.exports = {
  createTicket,
  updateTicket,
  deleteTicket,
  postCommentOnTicket,
};
