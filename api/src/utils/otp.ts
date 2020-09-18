import axios from 'axios';
import { MSG91_AUTH_KEY, MSG91_TEMPLATE_ID, otpExpiry, otpLength } from '../config';
import { logger } from '../logger/winston';

const baseUrl = `https://api.msg91.com/api/v5/otp`;

const headers = {
    'Content-Type': 'application/json'
};

export const sendOtp = async (phoneNumber: string) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `${baseUrl}?authkey=${MSG91_AUTH_KEY}&template_id=${MSG91_TEMPLATE_ID}&mobile=${phoneNumber}&otp_length=${otpLength}&otp_expiry=${otpExpiry}`,
            headers
        })
            .then((response) => {
                logger.info(`otp.send.info ${response}`);
                resolve();
            })
            .catch((error) => {
                logger.error(`otp.send.error ${error}`);
                reject();
            });
    });
};

export const verifyOtp = async () => {
    return new Promise((resolve, reject) => {});
};
