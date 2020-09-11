import { Request, Response, NextFunction } from 'express';
import { HttpError, HttpErrorHandler } from '../httpError';
import { HttpResponse, HttpResponseHandler } from '../httpResponse';

const time = Date();

export const healthCheck = (req: Request, res: Response, next: NextFunction) => {
    next(new HttpResponse(200, `API started at ${time.toString()}`));
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    next(new HttpError(404, 'not found'));
};

export const responseHandler = (response: any, req: Request, res: Response, next: NextFunction) => {
    if (response instanceof HttpResponse) {
        HttpResponseHandler(response, res);
    } else {
        response.meta.statusCode = response.meta.statusCode || 500;
        response.meta.msg = response.meta.msg || 'Internal Server Error';
        HttpErrorHandler(response, res);
    }
};
