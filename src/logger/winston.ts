/* eslint-disable prettier/prettier */
import { createLogger, format, transports, stream } from 'winston';
import { NODE_ENV } from '../config';

const { combine, timestamp, printf, prettyPrint } = format;

// eslint-disable-next-line no-shadow
const myFormat = printf(({ message, timestamp }) => {
    return `${timestamp} : ${message}`;
});

export const logger = createLogger({
    level: 'info',
    format: combine(
        format.splat(),
        format.simple(),
        timestamp(),
        format.colorize(),
        prettyPrint(),
        myFormat
    ),
    transports: [
        /*
            - Write all logs with level `error` and below to `error.log`
            - Write all logs with level `info` and below to `combined.log`
        */
        new transports.File({ filename: './logs/error.log', level: 'error' }),
        new transports.File({ filename: './logs/combined.log'})
    ],
    exitOnError: false
});
/*
    -stream for getting http logs from morgan middleware
    -http.logs: message
*/
export class LoggerStream {
    // eslint-disable-next-line class-methods-use-this
    write(message: string) {
        logger.info(`http.logs: ${message.substring(0, message.lastIndexOf('\n'))}`);
    }
}

/*
    If we're not in production then log to the `console` with the format:
    `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
*/
if (NODE_ENV !== 'production') {
    logger.add(
        new transports.Console({
            format: format.simple()
        })
    );
}
