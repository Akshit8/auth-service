import { NextFunction, Request, Response } from 'express';
import { message, statusCode } from '../config';
import { HttpError } from '../httpError';
import { HttpResponse } from '../httpResponse';
import { catchAsync } from '../middleware';
import { Permission, Role, RoleDocument } from '../models';

export const addRoleController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { roleName, description, permissions } = req.body;
    const role = await Role.findOne({ roleName });
    if (role) {
        throw new HttpError(statusCode.badRequest, message.roleAlreadyExists);
    }
    for (let i = 0; i < permissions.length; i++) {
        const permission = await Permission.findOne({ permissionName: permissions[i] });
        if (!permission) {
            throw new HttpError(statusCode.badRequest, message.permissionNotExist);
        }
    }
    const newPermission = new Role({ roleName, description, permissions });
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

export const updateRoleController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { roleID } = req.params;
    const { description, permissions } = req.body;
    const role = await Role.findById(roleID);
    if (!role) {
        throw new HttpError(statusCode.badRequest, message.roleNotExist);
    }
    if (description) {
        role.description = description;
    }
    if (permissions) {
        for (let i = 0; i < permissions.length; i++) {
            const permission = await Permission.findOne({ permissionName: permissions[i] });
            if (!permission) {
                throw new HttpError(statusCode.badRequest, message.permissionNotExist);
            }
        }
        role.permissions = permissions;
    }
    await role.save();
    next(new HttpResponse(statusCode.ok, role));
});

export const deleteRoleController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { roleID } = req.params;
    const role = await Role.findById(roleID);
    if (!role) {
        throw new HttpError(statusCode.badRequest, message.roleNotExist);
    }
    await role.remove();
    next(new HttpResponse(statusCode.ok, null));
});

export const addRolePermissionController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { roleID } = req.params;
    const { permissions } = req.body;
    const role = await Role.findById(roleID);
    if (!role) {
        throw new HttpError(statusCode.badRequest, message.roleNotExist);
    }
    for (let i = 0; i < permissions.length; i++) {
        const permission = await Permission.findOne({ permissionName: permissions[i] });
        if (!permission) {
            throw new HttpError(statusCode.badRequest, message.permissionNotExist);
        }
    }
    permissions.forEach((permission: string) => {
        if (role.permissions.includes(permission)) {
            throw new HttpError(statusCode.badRequest, message.permissionAlreadyExists);
        }
    });
    role.permissions = role.permissions.concat(permissions);
    await role.save();
    next(new HttpResponse(statusCode.ok, role));
});

export const deleteRolePermissionController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { roleID } = req.params;
    const { permissions } = req.body;
    const role = await Role.findById(roleID);
    if (!role) {
        throw new HttpError(statusCode.badRequest, message.roleNotExist);
    }
    permissions.forEach((permission: string) => {
        if (!role.permissions.includes(permission)) {
            throw new HttpError(statusCode.badRequest, 'Permission do not exist');
        }
    });
    role.permissions = role.permissions.filter((permission: string) => {
        return !permissions.includes(permission);
    });
    await role.save();
    next(new HttpResponse(statusCode.ok, role));
});
