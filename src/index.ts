import mongoose from 'mongoose';
import { PORT, HOST, MONGO_ATLAS_URI, MONGO_OPTIONS } from './config';
import { createExpressApp } from './app';

/*
    mongoose client
    connects to atlas mongo cluster
*/
mongoose
    .connect(MONGO_ATLAS_URI, MONGO_OPTIONS)
    .then(() => {
        console.log('db connected');
    })
    .catch((e) => {
        console.log(e);
    });

// create express app with features specifies in app.ts
const app = createExpressApp();

// start server at defined host and port
app.listen(+PORT, HOST, () => {
    console.log(`server listening at http://${HOST}:${PORT}`);
});
