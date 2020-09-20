import { NextFunction, Request, Response } from 'express';
import { message, statusCode } from '../config';
import { HttpError } from '../httpError';
import { HttpResponse } from '../httpResponse';
import { catchAsync } from '../middleware';
import { LoginSession, Role, User } from '../models';
import { sendOtp, verifyOtp, getJwtToken, jwtPayloadInterface, resendOtp } from '../utils';

export const loginController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber } = req.body;
    const checkPhoneNumber = await LoginSession.findOne({ phoneNumber });
    if (checkPhoneNumber) {
        throw new HttpError(statusCode.badRequest, message.phoneNumberLoggedIn);
    }
    const user = await User.findOne({ phoneNumber });
    if (!user) {
        throw new HttpError(statusCode.badRequest, message.userNotExist);
    }
    const newLoginSession = new LoginSession({ userID: user.serviceUserID, phoneNumber: user.phoneNumber });
    await newLoginSession.save();
    sendOtp(user.phoneNumber);
    next(new HttpResponse(statusCode.ok, null));
});

export const otpVerifyController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber, otp } = req.body;
    const checkPhoneNumber = await LoginSession.findOne({ phoneNumber });
    if (!checkPhoneNumber) {
        throw new HttpError(statusCode.badRequest, message.phoneNumberNotLoggedIn);
    }
    const verifyphoneNumberOtp = await verifyOtp(phoneNumber, otp);
    if (verifyphoneNumberOtp !== 'success') {
        throw new HttpError(statusCode.badRequest, message.invalidOtp);
    }
    const userRoles = await User.findOne({ serviceUserID: checkPhoneNumber.userID }).select('roles');
    let permissions: string[] = [];
    // using ! to ignore ts:2533
    for (let i = 0; i < userRoles!.roles.length; i++) {
        const rolePermission = await Role.findOne({ roleName: userRoles!.roles[i] }).select('permissions');
        permissions = permissions.concat(rolePermission!.permissions);
    }
    const jwtPayload: jwtPayloadInterface = {
        userID: checkPhoneNumber.userID,
        roles: userRoles!.roles,
        permissions
    };
    const token = await getJwtToken(jwtPayload);
    next(new HttpResponse(statusCode.ok, { token }));
});

export const resendController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber } = req.body;
    const checkLoginSession = await LoginSession.findOne({ phoneNumber });
    if (!checkLoginSession) {
        throw new HttpError(statusCode.badRequest, message.phoneNumberNotLoggedIn);
    }
    resendOtp(phoneNumber);
    next(new HttpResponse(statusCode.ok, null));
});

export const logoutController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    await LoginSession.findOneAndDelete({ token });
    next(new HttpResponse(statusCode.ok, null));
});
