import httpStatus from 'http-status';
import APIError from '../helpers/api-error';

const errorConverter = (err, req, res, next) => {
  let convertedError = err;
  if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message ? err.message : 'Internal Server Error',
      status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
      stack: err.stack,
    });
  }
  return next(convertedError);
};

export default errorConverter;
