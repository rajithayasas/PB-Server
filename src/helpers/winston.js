import chalk from 'chalk';
import Winston from 'winston';
import Config from '../config';

const { createLogger, format, transports } = Winston;

const { LOG_LEVEL } = Config;

const { combine, colorize, label, printf, json, timestamp } = format;

const logFormat = combine(
  timestamp(),
  json(),
  colorize(),
  label({ label: '[PassBook-Server]' }),
  printf(
    ({ timestamp: Timestamp, label: Label, level, message, ...info }) =>
      `${Timestamp} ${chalk.cyan(Label)} ${level} : ${message} : ${JSON.stringify({ ...info })}`
  )
);

const logger = createLogger({
  level: LOG_LEVEL || 'info',
  transports: [new transports.Console({})],
  format: logFormat,
  exitOnError: false,
});

export default logger;
