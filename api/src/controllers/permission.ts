import { NextFunction, Request, Response } from 'express';
import { message, statusCode } from '../config';
import { HttpError } from '../httpError';
import { HttpResponse } from '../httpResponse';
import { catchAsync } from '../middleware';
import { Permission, PermissionDocument } from '../models';

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
    const permission = await Permission.findById(permissionID);
    if (!permission) {
        throw new HttpError(statusCode.badRequest, message.permissionNotExist);
    }
    next(new HttpResponse(statusCode.ok, permission));
});

export const getAllPermissionsController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { skip, limit } = req.query;
    const allPermissions: PermissionDocument[] = await Permission.find(
        {},
        {
            description: false
        },
        {
            skip: +skip!,
            limit: +limit!
        }
    ).sort('createdAt');
    next(new HttpResponse(statusCode.ok, { permissions: allPermissions }));
});

export const updatePermissionController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

export const deletePermissionController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { permissionID } = req.params;
    const permission = await Permission.findById(permissionID);
    if (!permission) {
        throw new HttpError(statusCode.badRequest, message.permissionNotExists);
    }
    await permission.remove();
    next(new HttpResponse(statusCode.ok, null));
});
