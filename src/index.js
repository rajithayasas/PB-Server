// Import Modules
import http from 'http';
import dotenv from 'dotenv';

// Import App
import app from './app';

// Import Helpers
import mongo from './helpers/mongo';
import logger from './helpers/winston';

// Import Configs
import Config from './config';

const { PORT } = Config;
dotenv.config();

let server = null;

function closeServer() {
  return new Promise((resolve) => {
    if (server) {
      server.close(() => {
        logger.info('Server shutdown success. Good bye from PassBook API!!!');
        resolve();
      });
    } else {
      resolve();
    }
  });
}

async function shutdownServer() {
  try {
    await closeServer();
    logger.info('Gracefully - Shutting down PassBook API!!!');
    process.exit(0);
  } catch (error) {
    logger.info('Forcefully - Shutting down PassBook API!!!');
    process.exit(1);
  }
}

process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION!', err);
  shutdownServer();
});

const main = async () => {
  try {
    logger.info(`PassBook API is starting`);
    // Mongo connection
    await mongo.initialize();

    server = http.createServer(app);

    server.listen(PORT, () => {
      logger.info(`PassBook API is listening on ${PORT}`);
    });
    // set timeout of requests to 10 minutes
    server.timeout = 10 * 60 * 1000;
  } catch (error) {
    logger.error('Error occured while PassBook API is starting', error);
    process.exit(1);
  }
};

process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION!', err);
  shutdownServer();
});

main();
