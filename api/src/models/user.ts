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

userSchema.methods.toJSON = function () {
    const user = this.toObject();

    delete user.__v;
    delete user.createdAt;
    delete user.updatedAt;

    return user;
};

export const User = model<UserDocument>('users', userSchema);
