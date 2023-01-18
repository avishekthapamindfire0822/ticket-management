const CONSTANTS = require('./constant');

function checkEmailId(emailId) {
  return CONSTANTS.EMAIL_ID_REGEXP.test(emailId);
}

module.exports = {
  checkEmailId,
};
