const ErrorResponse = require('./../utils/errorResponse');
const errorHandler = (err, req, res, next) => {
  //long to console for dev
  // Mongose bad Objecsts
  if (err.name === 'castError') {
    const message = `Bootcamp not found with the id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  if (err.code === 11000) {
    const message = 'Duplicate field values entered';
    error = new ErrorResponse(message, 400);
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 404);
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error',
  });
};

module.exports = errorHandler;
