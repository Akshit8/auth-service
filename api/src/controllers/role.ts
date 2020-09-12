import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../middleware';

export const addRoleController = catchAsync((req: Request, res: Response, next: NextFunction) => {});

export const getRoleController = catchAsync((req: Request, res: Response, next: NextFunction) => {});

export const getAllRolesController = catchAsync((req: Request, res: Response, next: NextFunction) => {});

export const updateRoleController = catchAsync((req: Request, res: Response, next: NextFunction) => {});

export const deleteRoleController = catchAsync((req: Request, res: Response, next: NextFunction) => {});
