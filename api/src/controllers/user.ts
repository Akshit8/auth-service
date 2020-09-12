import { NextFunction, Request, Response } from 'express';
import { message, statusCode } from '../config';
import { HttpError } from '../httpError';
import { HttpResponse } from '../httpResponse';
import { catchAsync } from '../middleware';
import { User } from '../models';

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

export const getUserController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

export const getAllUsersController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

export const updateUserController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

export const deleteUserController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});
