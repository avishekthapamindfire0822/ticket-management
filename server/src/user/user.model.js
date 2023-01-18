const mongoose = require('mongoose');
const CONSTANTS = require('../shared/constant');
const util = require('../shared/util');
const userRoles = require('../user/user.roles');
const userSchema = new mongoose.Schema(
  {
    emailId: {
      type: String,
      unique: true,
      required: [true, CONSTANTS.EMAIL_ID_IS_REQUIRED],
      validate: {
        validator: util.checkEmailId,
        message: (props) => `${props.value} is not a valid Email-Id.`,
      },
    },
    password: {
      type: String,
      required: [true, CONSTANTS.PASSWORD_IS_REQUIRED],
    },
    firstName: {
      type: String,
      required: [true, CONSTANTS.FIRSTNAME_IS_REQUIRED],
    },
    lastName: {
      type: String,
      required: [true, CONSTANTS.LASTNAME_IS_REQUIRED],
    },
    role: {
      type: String,
      enum: [...Object.values(userRoles)],
    },
  },
  {
    timestamps: true,
    virtuals: {
      fullName: {
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
      },
    },
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
