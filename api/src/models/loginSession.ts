import { Schema, model, Document } from 'mongoose';

export interface LoginSessionDocument extends Document {
    userID: string;
    token: string;
    tokenExpiry: number;
}

const loginSessionSchema = new Schema(
    {
        userID: {
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

export const LoginSession = model<LoginSessionDocument>('login_sessions', loginSessionSchema);