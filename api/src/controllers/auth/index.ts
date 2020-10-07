import { NextFunction, Request, Response } from 'express';
import { message, statusCode } from '../../config';
import { HttpError } from '../../httpError';
import { HttpResponse } from '../../httpResponse';
import { catchAsync } from '../../middleware';
import { LoginSession } from '../../models';

export const logoutController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    console.log(token);
    await LoginSession.findOneAndDelete({ token });
    next(new HttpResponse(statusCode.ok, null));
});

export * from './otp';
export * from './username';
