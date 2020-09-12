import { Schema, model, Document } from 'mongoose';

export interface UserDocument extends Document {
    userName: string;
    phoneNumber: string;
    serviceUserID: string;
}

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true
        },
        serviceUserID: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const User = model<UserDocument>('users', userSchema);
