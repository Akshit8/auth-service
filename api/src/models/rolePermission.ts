import { Schema, model, Document } from 'mongoose';

export interface RolePermissionDocument extends Document {
    roleID: Schema.Types.ObjectId;
    permissionID: Schema.Types.ObjectId;
}

const rolePermissionSchema = new Schema(
    {
        roleID: {
            type: Schema.Types.ObjectId,
            requries: true,
            ref: 'roles'
        },
        permissionID: {
            type: Schema.Types.ObjectId,
            requries: true,
            ref: 'permissions'
        }
    },
    {
        timestamps: true
    }
);

export const RolePermission = model<RolePermissionDocument>('rolePermissions', rolePermissionSchema);
