import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../middleware';

export const addUserController = catchAsync((req: Request, res: Response, next: NextFunction) => {});

export const getUserController = catchAsync((req: Request, res: Response, next: NextFunction) => {});

export const getAllUsersController = catchAsync((req: Request, res: Response, next: NextFunction) => {});

export const updateUserController = catchAsync((req: Request, res: Response, next: NextFunction) => {});

export const deleteUserController = catchAsync((req: Request, res: Response, next: NextFunction) => {});
