const NotFoundException = require('../shared/exception/NotFoundException');
const User = require('../user/user.model');
const Ticket = require('./ticket.model');
const ticketStatus = require('./ticket.status');
const mongoose = require('mongoose');
const ForbiddenException = require('../shared/exception/ForbiddenException');
const { Comment } = require('./comment.model');
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
  const newComment = new Comment({ content: comment, author: user });
  ticket.comments.push(newComment);
  const updatedTicket = await ticket.save();
  const updatedComment = updatedTicket.comments.at(-1);
  return updatedComment;
};

const assignedTicket = async (ticketId, emailId) => {
  const _ticketId = mongoose.Types.ObjectId(ticketId);
  const ticket = await Ticket.findById(_ticketId);
  if (!ticket) {
    throw new NotFoundException();
  }
  const user = await User.findOne({
    emailId,
  });
  ticket.assignedTo = user;
  const updatedTicket = await ticket.save();
  return {
    _id: updatedTicket._id,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};

module.exports = {
  createTicket,
  updateTicket,
  deleteTicket,
  postCommentOnTicket,
  assignedTicket,
};
