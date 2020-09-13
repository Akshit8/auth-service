import { NextFunction, Request, Response } from 'express';
import { Schema } from 'mongoose';
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
            throw new HttpError(statusCode.badRequest, message.roleNotExist);
        }
        roleIDs.push(roleID._id);
    }
    for (let i = 0; i < roleIDs.length; i++) {
        const newUserRole = new UserRoles({ userID, roleID: roleIDs[i] });
        await newUserRole.save();
    }
    next(new HttpResponse(statusCode.created, null));
});

export const updateUserRolesController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.params;
    const { roleName } = req.body;
    const user = await User.findById(userID);
    if (!user) {
        throw new HttpError(statusCode.badRequest, message.userNotExist);
    }
    const roleID = await Role.findOne({ roleName }).select('_id');
    if (!roleID) {
        throw new HttpError(statusCode.badRequest, message.roleNotExist);
    }
    const newUserRole = new UserRoles({ userID, roleID });
    await newUserRole.save();
    next(new HttpResponse(statusCode.ok, null));
});

export const deleteUserRolesController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.params;
    const { roleName } = req.body;
    const user = await User.findById(userID);
    if (!user) {
        throw new HttpError(statusCode.badRequest, message.userNotExist);
    }
    const roleID = await Role.findOne({ roleName }).select('_id');
    if (!roleID) {
        throw new HttpError(statusCode.badRequest, message.roleNotExist);
    }
    const userIDObj = (userID as unknown) as Schema.Types.ObjectId;
    const userRole = await UserRoles.findOne({ userID: userIDObj, roleID: roleID._id });
    if (userRole) {
        await userRole.remove();
    }
    next(new HttpResponse(statusCode.ok, null));
});
