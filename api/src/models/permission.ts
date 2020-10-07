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

permissionSchema.statics.checkPermissionById = async (permissionID: string) => {
    // eslint-disable-next-line no-use-before-define
    const permission = await Permission.findById(permissionID);
    if (!permission) {
        throw new HttpError(statusCode.badRequest, message.permissionNotExists);
    }
    return permission;
};

export const Permission = model<PermissionDocument, PermissionModel>('permissions', permissionSchema);
