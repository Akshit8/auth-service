import { NextFunction, Request, Response } from 'express';
import { message, statusCode } from '../config';
import { HttpError } from '../httpError';
import { HttpResponse } from '../httpResponse';
import { catchAsync } from '../middleware';
import { Role, User, UserRoles } from '../models';

export const addUserRolesController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.params;
    const { rolesList } = req.body;
    const user = await User.findById(userID);
    if (!user) {
        throw new HttpError(statusCode.badRequest, message.userNotExist);
    }
    const roleIDs: string[] = [];
    for (let i = 0; i < rolesList.length; i++) {
        const roleID = await Role.findOne({ roleName: rolesList[i] }).select('_id');
        if (!roleID) {
            throw new HttpError(statusCode.badRequest, message.roleNotExits);
        }
        roleIDs.push(roleID._id);
    }
    for (let i = 0; i < roleIDs.length; i++) {
        const newUserRole = new UserRoles({ userID, roleID: roleIDs[i] });
        await newUserRole.save();
    }
    next(new HttpResponse(statusCode.created, null));
});

export const updateUserRolesController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

export const deleteUserRolesController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});
