const { encryptPassword } = require('../../auth/auth.util');
const dbConfig = require('../../config/dbConfig');
const User = require('../../user/user.model');
const fs = require('fs/promises');
const path = require('path');
const Ticket = require('../ticket.model');
const ticketProductTypes = require('../ticket.product-types');
const userRoles = require('../../user/user.roles');

(async function () {
  let mongoose;
  try {
    mongoose = await dbConfig();
    const users = await User.find({});
    const tickets = users.map((user) => {
      const ticket = new Ticket({
        submittedBy: user,
        about: Object.values(ticketProductTypes)[Math.floor(Math.random() * 5)],
        description: 'Default Ticket Description',
      });
      if (user.role === userRoles.IT_STAFF) {
        ticket.comments.push({
          content: 'Default comment',
          author: user,
        });
      }
      return ticket;
    });
    const insertedTickets = await Ticket.insertMany(tickets);
    await fs.writeFile(
      path.resolve(process.cwd(), 'ticket.txt'),
      JSON.stringify(insertedTickets, null, 4)
    );
  } catch (err) {
    console.log({ err });
  } finally {
    await mongoose.disconnect();
  }
})();
