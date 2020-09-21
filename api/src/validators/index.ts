import { header, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../middleware';
import { HttpError } from '../httpError';
import { message, statusCode } from '../config';

export const headerSchema = () => {
    return [
        header('Authorization').exists({ checkNull: true, checkFalsy: true }).withMessage(message.authHeaderRequired)
    ];
};

export const validate = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError(statusCode.badRequest, errors.array()[0].msg);
    }
    next();
});

export * from './permission';
