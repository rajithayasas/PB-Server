import accessEnv from '../helpers/access-env';

const data = {
  NODE_ENV: accessEnv('NODE_ENV', 'development'),
  PORT: accessEnv('PORT', 3333),
  DB_URL: accessEnv('DB_URL'),
  LOG_LEVEL: accessEnv('LOG_LEVEL', accessEnv('NODE_ENV', 'development') === 'development' ? 'debug' : 'info'),
};

export default data;
