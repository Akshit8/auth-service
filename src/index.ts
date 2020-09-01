import mongoose from 'mongoose';
import { PORT, HOST, MONGO_ATLAS_URI, MONGO_OPTIONS, NODE_ENV } from './config';
import { createExpressApp } from './app';
import { logger } from './logger/winston';

/*
    mongoose client
    connects to atlas mongo cluster
*/
mongoose
    .connect(MONGO_ATLAS_URI, MONGO_OPTIONS)
    .then(() => {
        logger.info('db connected');
        console.log('db connected');
    })
    .catch((e) => {
        logger.error(`mongo.connect.catch: ${e}`);
    });

// create express app with features specifies in app.ts
const app = createExpressApp();

// start server at defined host and port
app.listen(+PORT, HOST, () => {
    logger.info(`server listening at http://${HOST}:${PORT}`);
    logger.info(`Node ENV : ${NODE_ENV}`);
    console.log(`server listening at http://${HOST}:${PORT}`);
});
