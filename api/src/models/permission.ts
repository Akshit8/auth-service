/* eslint-disable no-use-before-define */
import { Schema, model } from 'mongoose';
import { message, statusCode } from '../config';
import { HttpError } from '../httpError';
import { PermissionDocument, PermissionModel } from './interface';

const permissionSchema = new Schema(
    {
        permissionName: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

permissionSchema.methods.toJSON = function () {
    const permission = this.toObject();

    delete permission.__v;
    delete permission.createdAt;
    delete permission.updatedAt;

    return permission;
};

permissionSchema.statics.checkPermissionById = async (permissionID: string): Promise<PermissionDocument> => {
    const permission = await Permission.findById(permissionID);
    if (!permission) {
        throw new HttpError(statusCode.badRequest, message.permissionNotExists);
    }
    return permission;
};

permissionSchema.statics.getAllPermissions = async (skip: number, limit: number): Promise<PermissionDocument[]> => {
    const allPermissions: PermissionDocument[] = await Permission.find(
        {},
        {
            description: false
        },
        {
            skip,
            limit
        }
    ).sort('createdAt');
    return allPermissions;
};

export const Permission = model<PermissionDocument, PermissionModel>('permissions', permissionSchema);
