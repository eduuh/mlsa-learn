const errorHandler = (err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statuCode || 500).json({
    success: false,
    errors: err.message || 'server error',
  });
};

module.exports = errorHandler;
