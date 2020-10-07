import { NextFunction, Request, Response } from 'express';
import { message, statusCode } from '../config';
import { HttpError } from '../httpError';
import { HttpResponse } from '../httpResponse';
import { catchAsync } from '../middleware';
import { Permission, Role, RoleDocument } from '../models';

export const addRoleController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { roleName, description } = req.body;
    const permissions = Array.from(new Set(req.body.permissions as string[]));
    const role = await Role.findOne({ roleName });
    if (role) {
        throw new HttpError(statusCode.badRequest, message.roleAlreadyExists);
    }
    await Role.checkAllPermissionsValid(permissions);
    const newPermission = new Role({ roleName, description, permissions });
    await newPermission.save();
    next(new HttpResponse(statusCode.created, null));
});

export const getRoleController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { roleID } = req.params;
    const role = await Role.checkRoleById(roleID);
    next(new HttpResponse(statusCode.ok, role));
});

export const getAllRolesController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { skip, limit } = req.query;
    const allRoles: RoleDocument[] = await Role.getAllRoles(+skip!, +limit!);
    next(new HttpResponse(statusCode.ok, { roles: allRoles }));
});

export const updateRoleController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { roleID } = req.params;
    const { description } = req.body;
    const permissions = Array.from(new Set(req.body.permissions as string[]));
    const role = await Role.checkRoleById(roleID);
    if (description) {
        role.description = description;
    }
    if (permissions) {
        await Role.checkAllPermissionsValid(permissions);
        role.permissions = permissions;
    }
    await role.save();
    next(new HttpResponse(statusCode.ok, role));
});

export const deleteRoleController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { roleID } = req.params;
    const role = await Role.checkRoleById(roleID);
    await role.remove();
    next(new HttpResponse(statusCode.ok, null));
});

export const addRolePermissionController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { roleID } = req.params;
    const permissions = Array.from(new Set(req.body.permissions as string[]));
    const role = await Role.checkRoleById(roleID);
    await Role.checkAllPermissionsValid(permissions);
    await Role.checkIfPermissionsExists(role, permissions);
    role.permissions = role.permissions.concat(permissions);
    await role.save();
    next(new HttpResponse(statusCode.ok, role));
});

export const deleteRolePermissionController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { roleID } = req.params;
    const permissions = Array.from(new Set(req.body.permissions as string[]));
    const role = await Role.checkRoleById(roleID);
    await Role.checkIfPermissionsExists(role, permissions);
    role.permissions = role.permissions.filter((permission: string) => {
        return !permissions.includes(permission);
    });
    await role.save();
    next(new HttpResponse(statusCode.ok, role));
});

export const addRoleFromRoleController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { roleName, description } = req.body;
    const roles = Array.from(new Set(req.body.roles as string[]));
    const role = await Role.findOne({ roleName });
    if (role) {
        throw new HttpError(statusCode.badRequest, message.roleAlreadyExists);
    }
    for (let i = 0; i < roles.length; i++) {
        const checkRoles = await Role.findOne({ roleName: roles[i] });
        if (!checkRoles) {
            throw new HttpError(statusCode.badRequest, message.roleNotExist);
        }
    }
    const rolePermissionsList: string[] = [];
    for (let i = 0; i < roles.length; i++) {
        const rolePermission = await Role.findOne({ roleName: roles[i] }).select('permissions');
        if (rolePermission) {
            rolePermissionsList.concat(rolePermission.permissions);
        }
    }
    const permissions: string[] = Array.from(new Set(rolePermissionsList));
    const newPermission = new Role({ roleName, description, permissions });
    await newPermission.save();
    next(new HttpResponse(statusCode.created, null));
});
