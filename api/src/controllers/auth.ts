import { NextFunction, Request, Response } from 'express';
import { message, statusCode } from '../config';
import { HttpError } from '../httpError';
import { HttpResponse } from '../httpResponse';
import { catchAsync } from '../middleware';
import { LoginSession, Role, User } from '../models';
import { sendOtp, verifyOtp, getJwtToken, jwtPayloadInterface, resendOtp } from '../utils';

export const loginController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userName } = req.body;
    const checkUserName = await LoginSession.findOne({ userName });
    if (checkUserName) {
        await LoginSession.findOneAndDelete({ userName });
    }
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
    const checkUserName = await LoginSession.findOne({ userName });
    if (!checkUserName) {
        throw new HttpError(statusCode.badRequest, message.phoneNumberNotLoggedIn);
    }
    const verifyphoneNumberOtp: any = await verifyOtp(checkUserName.phoneNumber, otp);
    if (verifyphoneNumberOtp.type !== 'success') {
        throw new HttpError(statusCode.badRequest, message.invalidExpiredOtp);
    }
    const userRoles = await User.findOne({ serviceUserID: checkUserName.userID }).select('roles');
    let permissions: string[] = [];
    // using ! to ignore ts:2533
    for (let i = 0; i < userRoles!.roles.length; i++) {
        const rolePermission = await Role.findOne({ roleName: userRoles!.roles[i] }).select('permissions');
        permissions = permissions.concat(rolePermission!.permissions);
    }
    const jwtPayload: jwtPayloadInterface = {
        userID: checkUserName.userID,
        roles: userRoles!.roles,
        permissions
    };
    const token = await getJwtToken(jwtPayload);
    const tokenExpiry = Date.now() + 12 * 60 * 60 * 1000;
    checkUserName.token = token as string;
    checkUserName.tokenExpiry = tokenExpiry;
    await checkUserName.save();
    next(new HttpResponse(statusCode.ok, { token }));
});

export const resendController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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

export const logoutController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    await LoginSession.findOneAndDelete({ token });
    next(new HttpResponse(statusCode.ok, null));
});
