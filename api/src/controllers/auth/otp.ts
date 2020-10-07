import { NextFunction, Request, Response } from 'express';
import { message, statusCode } from '../../config';
import { HttpError } from '../../httpError';
import { HttpResponse } from '../../httpResponse';
import { catchAsync } from '../../middleware';
import { LoginSession, User } from '../../models';
import { sendOtp, verifyOtp, getJwtToken, resendOtp } from '../../utils';

export const otpLoginController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userName } = req.body;
    await LoginSession.checkUserNameAndDelete(userName);
    const user = await User.findOne({ userName });
    if (!user) {
        throw new HttpError(statusCode.badRequest, message.userNotExist);
    }
    const newLoginSession = new LoginSession({
        userID: user.serviceUserID,
        userName: user.userName,
        phoneNumber: user.phoneNumber.substr(1)
    });
    await newLoginSession.save();
    sendOtp(user.phoneNumber.substr(1));
    next(new HttpResponse(statusCode.ok, null));
});

export const otpVerifyController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userName, otp } = req.body;
    const loginUser = await LoginSession.findOne({ userName });
    if (!loginUser) {
        throw new HttpError(statusCode.badRequest, message.phoneNumberNotLoggedIn);
    }
    const verifyphoneNumberOtp: any = await verifyOtp(loginUser.phoneNumber, otp);
    if (verifyphoneNumberOtp.type !== 'success') {
        throw new HttpError(statusCode.badRequest, message.invalidExpiredOtp);
    }
    const jwtPayload = await User.getUserRolesPermissions(loginUser.userID);
    const token = await getJwtToken(jwtPayload);
    const tokenExpiry = Date.now() + 12 * 60 * 60 * 1000;
    loginUser.token = token as string;
    loginUser.tokenExpiry = tokenExpiry;
    loginUser.loggedIn = true;
    await loginUser.save();
    next(new HttpResponse(statusCode.ok, { token }));
});

export const otpResendController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userName } = req.body;
    const checkLoginSession = await LoginSession.findOne({ userName });
    if (!checkLoginSession) {
        throw new HttpError(statusCode.badRequest, message.phoneNumberNotLoggedIn);
    }
    const response: any = await resendOtp(checkLoginSession.phoneNumber);
    if (response.type !== 'success') {
        throw new HttpError(statusCode.badRequest, response.message);
    }
    next(new HttpResponse(statusCode.ok, null));
});
