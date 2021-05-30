import httpStatus from 'http-status';
import APIError from '../helpers/api-error';

// eslint-disable-next-line
const notFoundError = (req, res, next) => {
  const err = new APIError({
    message: 'API not found',
    status: httpStatus.NOT_FOUND,
  });
  return next(err);
};

export default notFoundError;
