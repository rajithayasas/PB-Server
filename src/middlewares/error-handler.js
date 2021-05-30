import httpStatus from 'http-status';
import Config from '../config';

const { NODE_ENV } = Config;

const errorHandler = (err, req, res) => {
  const response = {
    status: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };
  if (NODE_ENV !== 'development') {
    delete response.stack;
  }
  res.status(err.status);
  res.json(response);
  res.end();
};

export default errorHandler;
