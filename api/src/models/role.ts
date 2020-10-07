import { Schema, model } from 'mongoose';
import { message, statusCode } from '../config';
import { HttpError } from '../httpError';
import { RoleDocument, RoleModel } from './interface';
import { Permission } from './permission';

const roleSchema = new Schema(
    {
        roleName: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        permissions: [
            {
                type: String,
                required: true
            }
        ]
    },
    {
        timestamps: true
    }
);

roleSchema.methods.toJSON = function () {
    const role = this.toObject();

    delete role.__v;
    delete role.createdAt;
    delete role.updatedAt;

    return role;
};

roleSchema.statics.checkRoleById = async (roleID: string): Promise<RoleDocument> => {
    // eslint-disable-next-line no-use-before-define
    const role = await Role.findById(roleID);
    if (!role) {
        throw new HttpError(statusCode.badRequest, message.roleNotExits);
    }
    return role;
};

roleSchema.statics.getAllRoles = async (skip: number, limit: number): Promise<RoleDocument[]> => {
    // eslint-disable-next-line no-use-before-define
    const allRoles: RoleDocument[] = await Role.find(
        {},
        {
            description: false,
            permissions: false
        },
        {
            skip: +skip!,
            limit: +limit!
        }
    ).sort('createdAt');
    return allRoles;
};

roleSchema.statics.checkAllPermissionsValid = async (permissions: string[]): Promise<null> => {
    for (let i = 0; i < permissions.length; i++) {
        const permission = await Permission.findOne({ permissionName: permissions[i] });
        if (!permission) {
            throw new HttpError(statusCode.badRequest, message.permissionNotExists);
        }
    }
    return null;
};

roleSchema.statics.checkIfPermissionsExists = async (role: RoleDocument, permissions: string[]): Promise<null> => {
    permissions.forEach((permission: string) => {
        if (role.permissions.includes(permission)) {
            throw new HttpError(statusCode.badRequest, message.permissionAlreadyExists);
        }
    });
    return null;
};

export const Role = model<RoleDocument, RoleModel>('roles', roleSchema);
