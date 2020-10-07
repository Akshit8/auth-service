import { Schema, model } from 'mongoose';
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

export const Permission = model<PermissionDocument, PermissionModel>('permissions', permissionSchema);
