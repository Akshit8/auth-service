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
        }
    },
    {
        timestamps: true
    }
);

export const Role = model<RoleDocument>('roles', roleSchema);
