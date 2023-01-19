const Ticket = require('../ticket/ticket.model');
const userRoles = require('./user.roles');

const getUserTickets = async (userId, role) => {
  if (role === userRoles.IT_STAFF) {
    const tickets = await Ticket.find({}).populate(
      'submittedBy',
      '_id firstName lastName emailId'
    );
    return { tickets };
  }
  const tickets = await Ticket.find({
    submittedBy: userId,
  }).select('_id description createdAt updatedAt status comments');
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

module.exports = {
  getUserTickets,
  getTicketAggregates,
};
