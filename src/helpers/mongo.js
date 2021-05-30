import mongoose from 'mongoose';

import logger from './winston';
import Config from '../config';

const { DB_URL } = Config;

const initialize = async () => {
  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      autoIndex: false,
      reconnectTries: 30,
      reconnectInterval: 2000,
      poolSize: 50,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 600000,
      bufferCommands: false,
      bufferMaxEntries: 0,
    });

    const dbConnection = mongoose.connection;
    dbConnection.on('connected', () => {
      logger.info('MongoDB - connection success');
    });
    dbConnection.on('disconnected', (error) => {
      logger.error('MongoDB - connection disconnected', error);
    });
    dbConnection.on('error', (error) => {
      logger.error('MongoDB - connection error', error);
    });
    dbConnection.on('reconnected', () => {
      logger.info('MongoDB - connection reconnected success');
    });
    dbConnection.on('reconnectFailed', (error) => {
      logger.error('MongoDB - connection reconnect failed', error);
    });
    dbConnection.on('close', (error) => {
      logger.error('MongoDB - connection close successfully', error);
    });

    return dbConnection;
  } catch (error) {
    logger.error('Mongo connection init error: ', error);
    throw new Error(error);
  }
};

export default { initialize };
