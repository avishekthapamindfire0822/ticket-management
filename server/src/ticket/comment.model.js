const { Schema, model } = require('mongoose');
const CONSTANTS = require('../shared/constants');
const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, CONSTANTS.COMMENT_CANNOT_BE_EMPTY],
    },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Comment = model('Comment', commentSchema);
module.exports = {
  Comment,
  commentSchema,
};
