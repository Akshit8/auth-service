import { NextFunction, Request, Response } from 'express';
import { message, statusCode } from '../config';
import { HttpResponse } from '../httpResponse';
import { catchAsync } from '../middleware';
import { User, UserDocument } from '../models';

export const addUserController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userName, email, phoneNumber, password, serviceUserID, serviceName, aadharNumber } = req.body;
    const roles = Array.from(new Set(req.body.roles as string[]));
    await User.checkUserByParameter({ userName }, message.userAlreadyExistsName);
    await User.checkUserByParameter({ email }, message.userAlreadyExistsMail);
    await User.checkUserByParameter({ phoneNumber }, message.userAlreadyExistsPhoneNo);
    await User.checkUserByParameter({ serviceUserID }, message.userAlreadyExistsID);
    await User.checkUserByParameter({ aadharNumber }, message.userAlreadyExistsAadharNo);
    await User.checkAllRolesValid(roles);
    const newUser = new User({ userName, email, phoneNumber, password, serviceUserID, serviceName, aadharNumber });
    await newUser.save();
    next(new HttpResponse(statusCode.created, { user: newUser }));
});

export const getUserController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.params;
    const user = await User.checkUserById(userID);
    next(new HttpResponse(statusCode.ok, { user }));
});

export const getAllUsersController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { skip, limit } = req.query;
    const allUsers: UserDocument[] = await User.getAllUsers(+skip!, +limit!);
    next(new HttpResponse(statusCode.ok, { users: allUsers }));
});

export const updateUserController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.params;
    const { userName, email, phoneNumber, password } = req.body;
    const roles = Array.from(new Set(req.body.roles as string[]));
    const user = await User.checkUserById(userID);
    if (userName) {
        await User.checkUserByParameter({ userName }, message.userAlreadyExistsName);
        user.userName = userName;
    }
    if (email) {
        await User.checkUserByParameter({ email }, message.userAlreadyExistsMail);
        user.email = email;
    }
    if (phoneNumber) {
        await User.checkUserByParameter({ phoneNumber }, message.userAlreadyExistsPhoneNo);
        user.phoneNumber = phoneNumber;
    }
    if (password) {
        user.password = password;
    }
    if (roles) {
        await User.checkAllRolesValid(roles);
        user.roles = roles;
    }
    await user.save();
    next(new HttpResponse(statusCode.ok, { user }));
});

export const deleteUserController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.params;
    const user = await User.checkUserById(userID);
    await user.remove();
    next(new HttpResponse(statusCode.ok, null));
});

export const addUserRoleController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.params;
    const { roles } = req.body;
    const user = await User.checkUserById(userID);
    await User.checkAllRolesValid(roles);
    await User.checkIfRoleExists(user, roles);
    user.roles = user.roles.concat(roles);
    await user.save();
    next(new HttpResponse(statusCode.ok, user));
});

export const deleteUserRoleController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.params;
    const { roles } = req.body;
    const user = await User.checkUserById(userID);
    await User.checkIfRoleExists(user, roles);
    user.roles = user.roles.filter((role: string) => {
        return !roles.includes(role);
    });
    await user.save();
    next(new HttpResponse(statusCode.ok, user));
});
