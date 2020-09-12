import { Schema, model, Document } from 'mongoose';

export interface PermissionDocument extends Document {
    permissionName: string;
    description: string;
}

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

export const Permission = model<PermissionDocument>('permissions', permissionSchema);
