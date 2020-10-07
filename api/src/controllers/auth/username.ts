import { NextFunction, Request, Response } from 'express';
import { message, statusCode } from '../../config';
import { HttpResponse } from '../../httpResponse';
import { catchAsync } from '../../middleware';
import { LoginSession, User } from '../../models';
import { getJwtToken } from '../../utils';

export const usernameLoginController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userName, password } = req.body;
    await LoginSession.checkUserNameAndDelete(userName);
    const user = await User.findByCredentials(userName, password);
    const jwtPayload = await User.getUserRolesPermissions(user.serviceUserID);
    const token = await getJwtToken(jwtPayload);
    const tokenExpiry = Date.now() + 12 * 60 * 60 * 1000;
    const newLoginSession = new LoginSession({
        userID: user!.serviceUserID,
        userName: user!.userName,
        email: user!.email,
        phoneNumber: user!.phoneNumber.substr(1),
        token,
        tokenExpiry,
        loggedIn: true
    });
    await newLoginSession.save();
    next(new HttpResponse(statusCode.ok, { token }));
});
