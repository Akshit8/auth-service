import { header, validationResult, query } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../middleware';
import { HttpError } from '../httpError';
import { message, statusCode } from '../config';

export const headerSchema = () => {
    return [
        header('Authorization')
            .exists({ checkNull: true, checkFalsy: true })
            .withMessage(message.authHeaderRequired)
            .customSanitizer((value: string) => {
                return value.replace('Bearer ', '');
            })
            .isJWT()
            .withMessage(message.invalidAuthHeader)
    ];
};

export const paginationSchema = () => {
    return [
        query('skip').exists().withMessage(message.skipParameterRequired).isNumeric(),
        query('limit').exists().withMessage(message.limitParameterRequired).isNumeric()
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
export * from './role';
export * from './user';
