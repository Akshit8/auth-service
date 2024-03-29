/* eslint-disable no-use-before-define */
import { Schema, model } from 'mongoose';
import { compare, hash } from 'bcryptjs';
import { message, PASSWORD_SALT_ROUNDS, statusCode } from '../config';
import { HttpError } from '../httpError';
import { jwtPayloadInterface, UserDocument, UserModel } from './interface';
import { Role } from './role';

const userSchema = new Schema(
    {
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

    delete user.password;
    delete user.__v;
    delete user.createdAt;
    delete user.updatedAt;

    return user;
};

userSchema.statics.checkUserById = async (userID: string): Promise<UserDocument> => {
    const user = await User.findById(userID);
    if (!user) {
        throw new HttpError(statusCode.badRequest, message.userNotExist);
    }
    return user;
};

userSchema.statics.checkUserByParameter = async (
    query: { [index: string]: string },
    errorMessage: string
): Promise<null> => {
    const user = await User.findOne(query);
    if (user) {
        throw new HttpError(statusCode.badRequest, errorMessage);
    }
    return null;
};

// userSchema.statics.checkUserByParameterAndUpdate = async (
//     user: UserDocument,
//     updates: [{ [index: string]: string }],
//     errorMessage: string[]
// ): Promise<UserDocument> => {
//     for (let i = 0; i < updates.length; i++) {
//         const checkUser = await User.findOne(updates[i]);
//         if (checkUser) {
//             throw new HttpError(statusCode.badRequest, errorMessage[i]);
//         }
//         user[updates[i].key] = updates[i].value;
//     }
//     return user;
// };

userSchema.statics.getAllUsers = async (skip: number, limit: number): Promise<UserDocument[]> => {
    const allUsers: UserDocument[] = await User.find(
        {},
        {
            phoneNumber: false,
            serviceUserID: false
        },
        {
            skip: +skip!,
            limit: +limit!
        }
    ).sort('createdAt');
    return allUsers;
};

userSchema.statics.checkAllRolesValid = async (roles: string[]): Promise<null> => {
    for (let i = 0; i < roles.length; i++) {
        const role = await Role.findOne({ roleName: roles[i] });
        if (!role) {
            throw new HttpError(statusCode.badRequest, message.roleNotExists);
        }
    }
    return null;
};

userSchema.statics.checkIfRoleExists = async (user: UserDocument, roles: string[]): Promise<null> => {
    roles.forEach((role: string) => {
        if (user.roles.includes(role)) {
            throw new HttpError(statusCode.badRequest, message.roleAlreadyExists);
        }
    });
    return null;
};

userSchema.statics.findByCredentials = async (userName: string, password: string): Promise<UserDocument> => {
    const user = await User.findOne({ userName });
    if (!user) {
        throw new HttpError(statusCode.badRequest, message.usernameNotMatchPassword);
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
        throw new HttpError(statusCode.badRequest, message.usernameNotMatchPassword);
    }
    return user;
};

userSchema.statics.getUserRolesPermissions = async (serviceUserID: string): Promise<jwtPayloadInterface> => {
    const userRoles = await User.findOne({ serviceUserID }).select('roles');
    let permissions: string[] = [];
    // using ! to ignore ts:2533
    for (let i = 0; i < userRoles!.roles.length; i++) {
        const rolePermission = await Role.findOne({ roleName: userRoles!.roles[i] }).select('permissions');
        permissions = permissions.concat(rolePermission!.permissions);
    }
    const jwtPayload: jwtPayloadInterface = {
        userID: serviceUserID,
        roles: userRoles!.roles,
        permissions
    };
    return jwtPayload;
};

// hash plain text password before saving
userSchema.pre<UserDocument>('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await hash(user.password, +PASSWORD_SALT_ROUNDS);
    }
    next();
});

export const User = model<UserDocument, UserModel>('users', userSchema);
