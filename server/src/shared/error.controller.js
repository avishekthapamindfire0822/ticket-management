const errorController = (err, req, res, next) => {
  console.log({ error: err?.message });
  if (err.isOperational) {
    return res.status(err.status).json({
      error: err.message,
      data: null,
    });
  }
  return res.status(500).json({
    error: 'SOMETHING WENT WRONG',
    data: null,
  });
};

module.exports = errorController;
