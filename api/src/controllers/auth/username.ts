import { NextFunction, Request, Response } from 'express';
import { message, statusCode } from '../../config';
import { HttpError } from '../../httpError';
import { HttpResponse } from '../../httpResponse';
import { catchAsync } from '../../middleware';
import { LoginSession, Role, User } from '../../models';
import { getJwtToken, jwtPayloadInterface } from '../../utils';

export const usernameLoginController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userName, password } = req.body;
    // const user = await User.findByCredentials(username, password);
    if (userName !== 'akshit') {
        throw new HttpError(statusCode.badRequest, message.usernameNotMatchPassword);
    }
    const user = await User.findOne({ userName });
    const userRoles = user;
    let permissions: string[] = [];
    // using ! to ignore ts:2533
    for (let i = 0; i < userRoles!.roles.length; i++) {
        const rolePermission = await Role.findOne({ roleName: userRoles!.roles[i] }).select('permissions');
        permissions = permissions.concat(rolePermission!.permissions);
    }
    const jwtPayload: jwtPayloadInterface = {
        userID: user!.serviceUserID,
        roles: userRoles!.roles,
        permissions
    };
    const token = await getJwtToken(jwtPayload);
    const tokenExpiry = Date.now() + 12 * 60 * 60 * 1000;
    const newLoginSession = new LoginSession({
        userID: user!.serviceUserID,
        userName: user!.userName,
        phoneNumber: user!.phoneNumber.substr(1)
    });
    await newLoginSession.save();
    next(new HttpResponse(statusCode.ok, { token }));
});
