const ErrorResponse = require('../utils/errorResponse');
const errorHandler = (err, req, res, next) => {
  console.log(err);
  let error = { ...err };

  error.message = err.message;
  console.log(err.stack);

  //Mongoose bad objectId
  if (err.name === 'CastError') {
    const message = `Bootcamp not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  console.log(error.name);
  res.status(error.statuCode || 500).json({
    success: false,
    errors: error.message || 'server error',
  });

  next(err);
};

module.exports = errorHandler;
