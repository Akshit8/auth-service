import { Schema, model, Document, Error, Model } from 'mongoose';
import { compare, hash } from 'bcryptjs';
import { message, PASSWORD_SALT_ROUNDS, statusCode } from '../config';
import { HttpError } from '../httpError';

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

export interface UserModel extends Model<UserDocument> {
    findByCredentials(username: string, password: string): UserDocument;
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

userSchema.statics.findByCredentials = async (username: string, password: string) => {
    // eslint-disable-next-line no-use-before-define
    const user = await User.findOne({ username });
    if (!user) {
        throw new HttpError(statusCode.badRequest, message.usernameNotMatchPassword);
    }
    const isMatch = await compare(user.password, PASSWORD_SALT_ROUNDS);
    if (!isMatch) {
        throw new HttpError(statusCode.badRequest, message.usernameNotMatchPassword);
    }
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

export const User = model<UserDocument, UserModel>('users', userSchema);
