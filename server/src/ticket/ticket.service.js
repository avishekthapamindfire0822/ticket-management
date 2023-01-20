const NotFoundException = require('../shared/exception/NotFoundException');
const User = require('../user/user.model');
const Ticket = require('./ticket.model');
const ticketStatus = require('./ticket.status');
const mongoose = require('mongoose');
const ForbiddenException = require('../shared/exception/ForbiddenException');
const { Comment } = require('./comment.model');
const createTicket = async (ticketDto) => {
  const { firstName, lastName, emailId, ...ticketDetails } = ticketDto;
  const newTicket = new Ticket({
    submittedBy: {
      firstName,
      lastName,
      emailId,
    },
    ...ticketDetails,
  });
  return await newTicket.save();
};

const updateTicket = async (ticketId, ticketStatus) => {
  const _id = mongoose.Types.ObjectId(ticketId);
  const ticket = await Ticket.findById(_id);
  if (!ticket) {
    throw new NotFoundException(`Ticket with id ${ticketId} not available`);
  }
  ticket.status = ticketStatus;
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
  console.log({ res: JSON.stringify(updatedComment) });
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
    emailId: user.emailId,
  };
};

const getTickets = async (req, res) => {
  const tickets = await Ticket.find({})
    .sort({ createdAt: -1 })
    .populate('submittedBy', '_id firstName lastName emailId')
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        model: 'User',
        select: '_id firstName lastName emailId',
      },
    })
    .populate('assignedTo', 'firstName lastName emailId');
  return tickets;
};

module.exports = {
  createTicket,
  updateTicket,
  deleteTicket,
  postCommentOnTicket,
  assignedTicket,
  getTickets,
};
