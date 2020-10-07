import { Schema, model } from 'mongoose';
import { RoleDocument, RoleModel } from './interface';

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

export const Role = model<RoleDocument, RoleModel>('roles', roleSchema);
