import { Response } from 'express';
/*
    meta body interface
*/
interface metaInterface {
    msg: string;
    statusCode: number;
    error: boolean;
}
/*
    Http error template
*/
export class HttpError extends Error {
    meta: metaInterface;

    constructor(statusCode: number, msg: string) {
        super();
        this.meta = {
            msg,
            statusCode,
            error: true
        };
    }
}
/*
    Http error handler
*/
export const HttpErrorHandler = (err: HttpError, res: Response) => {
    res.status(err.meta.statusCode).send(err);
};
