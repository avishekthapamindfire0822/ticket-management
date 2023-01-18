const bcrypt = require('bcrypt');
const config = require('../config');
async function encryptPassword(password) {
  return bcrypt.hash(password, +config.passwordSalt);
}

async function comparePassword(plainPassword, hashPassword) {
  return bcrypt.compare(plainPassword, hashPassword);
}

module.exports = {
  encryptPassword,
  comparePassword,
};
