const { Schema, model } = require('mongoose');
const CONSTANTS = require('../shared/constants');
const ticketProductTypes = require('./ticket.product-types');
const ticketStatus = require('./ticket.status');
const { commentSchema } = require('./comment.model');
const ticketSchema = new Schema(
  {
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
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
    submittedBy: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      emailId: {
        type: String,
        required: true,
      },
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Ticket = model('Ticket', ticketSchema);
module.exports = Ticket;
