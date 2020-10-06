import { Schema, model, Document, Error } from 'mongoose';
import { hash } from 'bcryptjs';
import { PASSWORD_SALT_ROUNDS } from '../config';

export interface UserDocument extends Document {
    employeeName: string;
    userName: string;
    email: string;
    phoneNumber: string;
    password: string;
    serviceUserID: string;
    aadharNumber: string;
    roles: string[];
}

const userSchema = new Schema(
    {
        employeeName: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        serviceUserID: {
            type: String,
            required: true,
            unique: true
        },
        serviceName: {
            type: String,
            required: true
        },
        aadharNumber: {
            type: String,
            required: true,
            unique: true
        },
        roles: [
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

userSchema.methods.toJSON = function () {
    const user = this.toObject();

    delete user.__v;
    delete user.createdAt;
    delete user.updatedAt;

    return user;
};

// hash plain text password before saving
userSchema.pre<UserDocument>('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        hash(user.password, PASSWORD_SALT_ROUNDS, (err: Error, hashPswd: string) => {
            if (err) {
                return next(err);
            }
            user.password = hashPswd;
        });
    }
    next();
});

export const User = model<UserDocument>('users', userSchema);
