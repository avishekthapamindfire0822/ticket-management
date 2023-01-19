const { Schema, model } = require('mongoose');
const util = require('../shared/util');
const CONSTANTS = require('../shared/constants');
const ticketProductTypes = require('./ticket.product-types');
const ticketStatus = require('./ticket.status');
const ticketSchema = new Schema(
  {
    submittedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    about: {
      type: String,
      required: [true, CONSTANTS.TICKET_RELATED_PRODUCT_REQUIRED],
      enum: [...Object.values(ticketProductTypes)],
    },
    status: {
      type: String,
      enum: [...Object.values(ticketStatus)],
      default: ticketStatus.UNDER_REVIEW,
    },
    description: String,
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [
      {
        author: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Ticket = model('Ticket', ticketSchema);
module.exports = Ticket;
