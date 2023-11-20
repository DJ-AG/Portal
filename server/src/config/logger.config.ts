import * as winston from 'winston';
import * as config from '../utils/config';

// Create a custom Winston format that checks if logged information is an instance of Error
// If it is, it modifies the logged info to display the error stack trace.
const enumerateErrorFormat = winston.format((info: any) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

// Creating and configuring a Winston logger
const logger = winston.createLogger({
  // Setting the logging level based on the node environment.
  // If in production, only log 'info' and above, otherwise 'debug' and above.
  level: config.node_env === 'production' ? 'info' : 'debug',

  // Defining the format of the logs
  format: winston.format.combine(
    // Applying the custom error format defined earlier
    enumerateErrorFormat(),
    // Applying color to output in console
    winston.format.colorize(),
    // Outputting logs in JSON format
    winston.format.json(),
    // Enabling string interpolation
    winston.format.splat(),
    // Defining a printf format for displaying the log level and message
    winston.format.printf(({ level, message }) => `${level}: ${message}`),
  ),

  // Defining the transport (i.e., where the logs are sent)
  transports: [
    // Using console transport and directing 'error' level messages to stderr.
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

export default logger;