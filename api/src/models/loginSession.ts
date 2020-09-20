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
        token: {
            type: String,
            required: true
        },
        tokenExpiry: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const LoginSession = model<LoginSessionDocument>('login_sessions', loginSessionSchema);
