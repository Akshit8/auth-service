import { NextFunction, Request, Response } from 'express';
import { message, statusCode } from '../config';
import { HttpError } from '../httpError';
import { HttpResponse } from '../httpResponse';
import { catchAsync } from '../middleware';
import { Role, RoleDocument } from '../models';

export const addRoleController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { roleName, description } = req.body;
    const role = await Role.findOne({ roleName });
    if (role) {
        throw new HttpError(statusCode.badRequest, message.roleAlreadyExists);
    }
    const newPermission = new Role({ roleName, description });
    await newPermission.save();
    next(new HttpResponse(statusCode.created, null));
});

export const getRoleController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { roleID } = req.params;
    const role = await Role.findById(roleID);
    if (!role) {
        throw new HttpError(statusCode.badRequest, message.roleNotExits);
    }
    next(new HttpResponse(statusCode.ok, role));
});

export const getAllRolesController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { skip, limit } = req.query;
    const allRoles: RoleDocument[] = await Role.find(
        {},
        {},
        {
            skip: +skip!,
            limit: +limit!
        }
    ).sort('createdAt');
    next(new HttpResponse(statusCode.ok, allRoles));
});

export const updateRoleController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {});

export const deleteRoleController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { roleID } = req.params;
    const role = await Role.findById(roleID);
    if (!role) {
        throw new HttpError(statusCode.badRequest, message.roleNotExist);
    }
    await role.remove();
    next(new HttpResponse(statusCode.ok, null));
});
