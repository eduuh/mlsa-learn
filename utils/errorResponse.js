class ErrorResponse extends Error {
  constructor(messages, statuscode) {
    super(messages);
    this.statuscode = statuscode;
  }
}

module.exports = ErrorResponse;
