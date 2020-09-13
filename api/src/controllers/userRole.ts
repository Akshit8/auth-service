import { NextFunction, Request, Response } from 'express';
import { message, statusCode } from '../config';
import { HttpError } from '../httpError';
import { HttpResponse } from '../httpResponse';
import { catchAsync } from '../middleware';

export const addUserRolesController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

export const updateUserRolesController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

export const deleteUserRolesController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});
