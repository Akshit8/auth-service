import { NextFunction, Request, Response } from 'express';
import { message, statusCode } from '../config';
import { HttpError } from '../httpError';
import { HttpResponse } from '../httpResponse';
import { catchAsync } from '../middleware';

export const addUserController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

export const getUserController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

export const getAllUsersController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

export const updateUserController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

export const deleteUserController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});
