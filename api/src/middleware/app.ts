import { Request, Response, NextFunction, RequestHandler } from 'express';
import { HttpError, HttpErrorHandler } from '../httpError';
import { HttpResponse, HttpResponseHandler } from '../httpResponse';
import { message, statusCode } from '../config';
import { logger } from '../logger/winston';

const time = Date();

// healthCheck handler
export const healthCheck = (req: Request, res: Response, next: NextFunction) => {
    next(new HttpResponse(statusCode.ok, `API started at ${time.toString()}`));
};

// try-catch handler
export const catchAsync = (handler: RequestHandler) => (...args: [Request, Response, NextFunction]) =>
    handler(...args).catch(args[2]);

// endpoint not found handler
export const notFound = (req: Request, res: Response, next: NextFunction) => {
    next(new HttpError(statusCode.notFound, message.notFound));
};

// all response handler
export const responseHandler = (response: any, req: Request, res: Response, next: NextFunction) => {
    if (response instanceof HttpResponse) {
        HttpResponseHandler(response, res);
    } else {
        if (!(response instanceof HttpError)) {
            // logging error here
            logger.error(`app.error ${response.name}:${response.message}`);
            response = new HttpError(statusCode.serverError, message.serverError);
        }
        HttpErrorHandler(response, res);
    }
};
