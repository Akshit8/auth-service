import { NextFunction, Request, Response } from 'express';
import { message, statusCode } from '../config';
import { HttpError } from '../httpError';
import { HttpResponse } from '../httpResponse';
import { catchAsync } from '../middleware';
import { User } from '../models';
import { sendOtp } from '../utils';

export const loginController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber } = req.body;
    const user = await User.findOne({ phoneNumber });
    if (!user) {
        throw new HttpError(statusCode.badRequest, message.userNotExist);
    }
    sendOtp(user.phoneNumber);
    next(new HttpResponse(statusCode.ok, null));
});

export const otpVerifyController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

export const resendController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

export const logoutController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});
