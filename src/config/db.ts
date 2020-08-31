import { ConnectionOptions } from 'mongoose';

export const { MONGO_ATLAS_URI = '/*----assign with env variable----*/' } = process.env;

export const MONGO_OPTIONS: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};
