const { verifyJwtToken } = require('../auth/auth.util');
const UnAuthorizedException = require('../shared/exception/UnAuthorizedException');
const asyncHandler = require('express-async-handler');
const verifyAuth = asyncHandler(async (req, res, next) => {
  const token =
    req.headers.authorization?.split(' ')[1] || req.cookies?.['access-token'];
  if (!token) {
    throw new UnAuthorizedException();
  }
  const { role, exp } = await verifyJwtToken(token);
  if (Date.now() > exp * 1000) {
    throw new UnAuthorizedException();
  }
  req.role = role;
  next();
});

module.exports = verifyAuth;
