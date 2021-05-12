class ErrorResponse extends Error {
  constructor(message, statusCode) {
    // Use super to access and call functions on an object's parent
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
