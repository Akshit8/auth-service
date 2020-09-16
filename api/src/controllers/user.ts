import { NextFunction, Request, Response } from 'express';
import { message, statusCode } from '../config';
import { HttpError } from '../httpError';
import { HttpResponse } from '../httpResponse';
import { catchAsync } from '../middleware';
import { Role, User, UserDocument } from '../models';

export const addUserController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userName, phoneNumber, serviceUserID } = req.body;
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
    const newUser = new User({ userName, phoneNumber, serviceUserID });
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
        {},
        {
            skip: +skip!,
            limit: +limit!
        }
    ).sort('createdAt');
    next(new HttpResponse(statusCode.ok, allUsers));
});

export const updateUserController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.params;
    const { userName, phoneNumber, rolesList } = req.body;
    const user = await User.findById(userID);
    if (!user) {
        throw new HttpError(statusCode.badRequest, message.userNotExist);
    }
    if (userName) {
        const checkUserNameExist = await User.findOne({ userName });
        if (checkUserNameExist) {
            throw new HttpError(statusCode.badRequest, 'username already exists');
        }
        user.userName = userName;
    }
    if (phoneNumber) {
        const checkPhoneNumberExist = await User.findOne({ userName });
        if (checkPhoneNumberExist) {
            throw new HttpError(statusCode.badRequest, 'phone number already exists');
        }
        user.phoneNumber = phoneNumber;
    }
    if (rolesList) {
        for (let i = 0; i < rolesList.length; i++) {
            const role = await Role.findOne({ roleName: rolesList[i] });
            if (!role) {
                throw new HttpError(statusCode.badRequest, message.roleNotExist);
            }
        }
        user.rolesList = rolesList;
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

export const addUserRoleController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

export const deleteUserRoleController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});
