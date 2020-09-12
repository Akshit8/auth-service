import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../middleware';

export const addPermissionController = catchAsync((req: Request, res: Response, next: NextFunction) => {});

export const getPermissionController = catchAsync((req: Request, res: Response, next: NextFunction) => {});

export const getAllPermissionsController = catchAsync((req: Request, res: Response, next: NextFunction) => {});

export const updatePermissionController = catchAsync((req: Request, res: Response, next: NextFunction) => {});

export const deletePermissionController = catchAsync((req: Request, res: Response, next: NextFunction) => {});
