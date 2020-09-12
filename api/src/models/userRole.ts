import { Schema, model, Document } from 'mongoose';

export interface UserRoleDocument extends Document {
    userID: Schema.Types.ObjectId;
    roleID: Schema.Types.ObjectId;
}

const userRoleSchema = new Schema(
    {
        userID: {
            type: Schema.Types.ObjectId,
            requries: true,
            ref: 'users'
        },
        roleID: {
            type: Schema.Types.ObjectId,
            requries: true,
            ref: 'roles'
        }
    },
    {
        timestamps: true
    }
);

export const UserRoles = model<UserRoleDocument>('userRoles', userRoleSchema);
