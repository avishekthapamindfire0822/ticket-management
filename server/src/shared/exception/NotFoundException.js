class NotFoundException extends Error {
  constructor(message) {
    super(404, message);
  }
}

module.exports = NotFoundException;
