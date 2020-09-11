import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import { notFound, responseHandler, healthCheck } from './middleware';
import { LoggerStream } from './logger/winston';
import router from './routes';

export const createExpressApp = () => {
    const app = express();

    // helmet for hiding metadate pertaining to express in http request header
    // decreases vulnerability
    app.use(helmet({ dnsPrefetchControl: { allow: true } }));
    // compress json responses
    app.use(compression());
    // enables cors to all routes
    app.use(cors());

    // for http logging
    app.use(morgan('combined', { stream: new LoggerStream() }));

    // parsing json responses
    app.use(express.json());
    // for parsing application/xwww-form-urlencoded
    app.use(express.urlencoded({ extended: true }));

    // healthCheck route
    app.get('/api/v1/auth/healthCheck', healthCheck);

    // app router
    app.use('/api/vi/auth', router);

    // not found handler
    app.use(notFound);
    // central response + error handler
    app.use(responseHandler);

    return app;
};
