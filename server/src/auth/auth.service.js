const ForbiddenException = require('../shared/exception/ForbiddenException');
const NotFoundException = require('../shared/exception/NotFoundException');
const User = require('../user/user.model');
const { comparePassword, createJwtToken } = require('./auth.util');

const loginUser = async ({ emailId, password }) => {
  const user = await User.findOne({
    emailId,
  });
  if (!user) {
    throw new NotFoundException('EmailId is not registered.');
  }
  const isPasswordSame = await comparePassword(password, user.password);
  if (!isPasswordSame) {
    throw new ForbiddenException('EmailId or password is invalid');
  }
  const token = await createJwtToken({
    _id: user.id,
    role: user.role,
  });
  return {
    emailId: user.emailId,
    fullName: user.fullName,
    role: user.role,
    token,
  };
};

module.exports = {
  loginUser,
};
