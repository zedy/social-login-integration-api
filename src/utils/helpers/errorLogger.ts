// imports
import { format, createLogger, transports } from 'winston';

const {
  combine,
  timestamp,
  label,
  printf,
} = format;

const myFormat = printf(({
  // eslint-disable-next-line no-shadow
  level, message, label, timestamp,
}) => `${timestamp} [${label}] ${level}: ${message}`);

/**
 * Winston logger utility.
 *
 * It logs errors to a file.
 */
const logger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'Logger' }),
    timestamp({
      format: 'DD-MMM-YYYY | HH:mm:ss',
    }),
    myFormat,
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

export default logger;
