import fetch from 'node-fetch';
import { AUTH_KEY, TEMPLATE_ID } from '../config';

export const send = async (mobileNO: string) => {
    await fetch(
        `https://api.msg91.com/api/v5/otp?authkey=${AUTH_KEY}&template_id=${TEMPLATE_ID}&mobile=${mobileNO}&otp_length=4`
    );
};

export const verify = async (mobileNo: string, otp: string) => {
    const data = await fetch(
        `https://api.msg91.com/api/v5/otp/verify?mobile=${mobileNo}&otp=${otp}&authkey=${AUTH_KEY}`,
        { method: 'POST' }
    );
    const obj = await data.json();
    return obj;
};

export const resend = async (mobileNO: string) => {
    await fetch(`https://api.msg91.com/api/v5/otp/retry?mobile=${mobileNO}&authkey=${AUTH_KEY}`, { method: 'POST' });
};
