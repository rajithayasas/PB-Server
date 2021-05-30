import httpStatus from 'http-status';

class APIError extends Error {
  constructor({ message, errors, status = httpStatus.INTERNAL_SERVER_ERROR }) {
    super(message);
    this.message = message;
    this.errors = errors;
    this.status = status;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default APIError;
