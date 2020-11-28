import { NextFunction, Request, Response } from 'express';
import { message, statusCode } from '../config';
import { HttpError } from '../httpError';
import { HttpResponse } from '../httpResponse';
import { catchAsync } from '../middleware';
import { jwtVerifyInterface } from '../models';
import { verifyJwtToken } from '../utils';

export const verifyTokenController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const jwtToken = req.header('Authorization');
    const verifyPayload: jwtVerifyInterface = await verifyJwtToken(jwtToken);
    if (verifyPayload.status === 401) {
        throw new HttpError(verifyPayload.status, verifyPayload.message);
    }
    throw new HttpResponse(verifyPayload.status, verifyPayload.payload);
});