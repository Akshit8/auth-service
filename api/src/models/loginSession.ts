/* eslint-disable no-use-before-define */
import { Schema, model } from 'mongoose';
import { LoginSessionDocument, LoginSessionModel } from './interface';

const loginSessionSchema = new Schema(
    {
        userID: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        token: {
            type: String
        },
        tokenExpiry: {
            type: Number
        },
        loggedIn: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

loginSessionSchema.statics.checkUserNameAndDelete = async (userName: string): Promise<null> => {
    const user = await LoginSession.findOne({ userName });
    if (user) {
        await LoginSession.findOneAndDelete({ userName });
    }
    return null;
};

export const LoginSession = model<LoginSessionDocument, LoginSessionModel>('login_sessions', loginSessionSchema);
