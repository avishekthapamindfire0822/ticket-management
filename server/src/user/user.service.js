const Ticket = require('../ticket/ticket.model');
const User = require('./user.model');
const userRoles = require('./user.roles');

const getUserTickets = async (userId, role) => {
  if (role === userRoles.IT_STAFF) {
    // const tickets = await Ticket.find({}).populate(
    //   'submittedBy',
    //   '_id firstName lastName emailId'
    // );
    const tickets = await Ticket.find({})
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
  }
  const tickets = await Ticket.find({
    submittedBy: userId,
  })
    .populate('assignedTo', 'firstName lastName')
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        model: 'User',
        select: '_id firstName lastName emailId',
      },
    })
    .select('_id description createdAt updatedAt status');
  return { tickets };
};

const getTicketAggregates = async () => {
  const noOfTicketBasedOnStatus = await Ticket.aggregate().group({
    _id: '$status',
    count: { $sum: 1 },
  });
  const result = noOfTicketBasedOnStatus.reduce((cumm, curr) => {
    cumm[curr._id] = curr.count;
    return cumm;
  }, {});
  return {
    ...result,
  };
};

const getITStaff = async () => {
  return User.find({
    role: userRoles.IT_STAFF,
  }).select('emailId firstName lastName');
};

module.exports = {
  getUserTickets,
  getTicketAggregates,
  getITStaff,
};
