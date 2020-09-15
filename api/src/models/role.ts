import { Schema, model, Document } from 'mongoose';

export interface RoleDocument extends Document {
    roleName: string;
    description: string;
}

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
        permissions: [{
            permission: {
                type: String,
                required: true
            }
        }]
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

export const Role = model<RoleDocument>('roles', roleSchema);
