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

export const Permission = model<PermissionDocument>('permissions', permissionSchema);
