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

export const LoginSession = model<LoginSessionDocument, LoginSessionModel>('login_sessions', loginSessionSchema);
