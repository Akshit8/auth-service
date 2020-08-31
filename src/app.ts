import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import { notFound, responseHandler, apiCheck } from './middleware';

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
    app.use(morgan('dev'));

    // parsing json responses
    app.use(express.json());
    // for parsing application/xwww-form-urlencoded
    app.use(express.urlencoded({ extended: true }));

    // check route
    app.get('/api', apiCheck);

    // not found handler
    app.use(notFound);
    // central response + error handler
    app.use(responseHandler);

    return app;
};
