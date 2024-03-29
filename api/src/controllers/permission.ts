import { NextFunction, Request, Response } from 'express';
import { message, statusCode } from '../config';
import { HttpError } from '../httpError';
import { HttpResponse } from '../httpResponse';
import { catchAsync } from '../middleware';
import { Permission } from '../models';
import { PermissionDocument } from '../models/interface';

export const addPermissionController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { permissionName, description } = req.body;
    const permission = await Permission.findOne({ permissionName });
    if (permission) {
        throw new HttpError(statusCode.badRequest, message.permissionAlreadyExists);
    }
    const newPermission = new Permission({ permissionName, description });
    await newPermission.save();
    next(new HttpResponse(statusCode.created, null));
});

export const getPermissionController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { permissionID } = req.params;
    const permission = await Permission.checkPermissionById(permissionID);
    next(new HttpResponse(statusCode.ok, permission));
});

export const getAllPermissionsController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { skip, limit } = req.query;
    const allPermissions: PermissionDocument[] = await Permission.getAllPermissions(+skip!, +limit!);
    next(new HttpResponse(statusCode.ok, { permissions: allPermissions }));
});

export const updatePermissionController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

export const deletePermissionController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { permissionID } = req.params;
    const permission = await Permission.checkPermissionById(permissionID);
    await permission.remove();
    next(new HttpResponse(statusCode.ok, null));
});
