import { NextFunction, Request, Response } from 'express';
import { message, statusCode } from '../config';
import { HttpError } from '../httpError';
import { HttpResponse } from '../httpResponse';
import { catchAsync } from '../middleware';

export const loginController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

export const otpVerifyController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

export const resendController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

export const logoutController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});
