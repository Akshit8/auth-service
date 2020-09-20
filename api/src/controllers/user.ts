import { NextFunction, Request, Response } from 'express';
import { message, statusCode } from '../config';
import { HttpError } from '../httpError';
import { HttpResponse } from '../httpResponse';
import { catchAsync } from '../middleware';
import { Role, User, UserDocument } from '../models';

export const addUserController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userName, phoneNumber, serviceUserID } = req.body;
    const roles = Array.from(new Set(req.body.roles as string[]));
    const userByName = await User.findOne({ userName });
    if (userByName) {
        throw new HttpError(statusCode.badRequest, message.userAlreadyExistsName);
    }
    const userByNo = await User.findOne({ phoneNumber });
    if (userByNo) {
        throw new HttpError(statusCode.badRequest, message.userAlreadyExistsNo);
    }
    const userByID = await User.findOne({ serviceUserID });
    if (userByID) {
        throw new HttpError(statusCode.badRequest, message.userAlreadyExistsID);
    }
    for (let i = 0; i < roles.length; i++) {
        const role = await Role.findOne({ roleName: roles[i] });
        if (!role) {
            throw new HttpError(statusCode.badRequest, message.roleNotExist);
        }
    }
    const newUser = new User({ userName, phoneNumber, serviceUserID, roles });
    await newUser.save();
    next(new HttpResponse(statusCode.created, null));
});

export const getUserController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.params;
    const user = await User.findById(userID);
    if (!user) {
        throw new HttpError(statusCode.badRequest, message.userNotExist);
    }
    next(new HttpResponse(statusCode.ok, user));
});

export const getAllUsersController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { skip, limit } = req.query;
    const allUsers: UserDocument[] = await User.find(
        {},
        {
            phoneNumber: false,
            serviceUserID: false
        },
        {
            skip: +skip!,
            limit: +limit!
        }
    ).sort('createdAt');
    next(new HttpResponse(statusCode.ok, { users: allUsers }));
});

export const updateUserController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.params;
    const { userName, phoneNumber, roles } = req.body;
    const user = await User.findById(userID);
    if (!user) {
        throw new HttpError(statusCode.badRequest, message.userNotExist);
    }
    if (userName) {
        const checkUserNameExist = await User.findOne({ userName });
        if (checkUserNameExist) {
            throw new HttpError(statusCode.badRequest, message.userAlreadyExistsName);
        }
        user.userName = userName;
    }
    if (phoneNumber) {
        const checkPhoneNumberExist = await User.findOne({ userName });
        if (checkPhoneNumberExist) {
            throw new HttpError(statusCode.badRequest, message.userAlreadyExistsNo);
        }
        user.phoneNumber = phoneNumber;
    }
    if (roles) {
        for (let i = 0; i < roles.length; i++) {
            const role = await Role.findOne({ roleName: roles[i] });
            if (!role) {
                throw new HttpError(statusCode.badRequest, message.roleNotExist);
            }
        }
        user.roles = roles;
    }
    await user.save();
    next(new HttpResponse(statusCode.ok, user));
});

export const deleteUserController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.params;
    const user = await User.findById(userID);
    if (!user) {
        throw new HttpError(statusCode.badRequest, message.userNotExist);
    }
    await user.remove();
    next(new HttpResponse(statusCode.ok, null));
});

export const addUserRoleController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.params;
    const { roles } = req.body;
    const user = await User.findById(userID);
    if (!user) {
        throw new HttpError(statusCode.badRequest, message.userNotExist);
    }
    for (let i = 0; i < roles.length; i++) {
        const role = await Role.findOne({ roleName: roles[i] });
        if (!role) {
            throw new HttpError(statusCode.badRequest, message.roleNotExist);
        }
    }
    roles.forEach((role: string) => {
        if (user.roles.includes(role)) {
            throw new HttpError(statusCode.badRequest, message.roleAlreadyExists);
        }
    });
    user.roles = user.roles.concat(roles);
    await user.save();
    next(new HttpResponse(statusCode.ok, user));
});

export const deleteUserRoleController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.params;
    const { roles } = req.body;
    const user = await User.findById(userID);
    if (!user) {
        throw new HttpError(statusCode.badRequest, message.userNotExist);
    }
    roles.forEach((role: string) => {
        if (!user.roles.includes(role)) {
            throw new HttpError(statusCode.badRequest, message.roleNotExist);
        }
    });
    user.roles = user.roles.filter((role: string) => {
        return !roles.includes(role);
    });
    await user.save();
    next(new HttpResponse(statusCode.ok, user));
});
