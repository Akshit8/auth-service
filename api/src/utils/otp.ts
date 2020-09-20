import axios from 'axios';
import { MSG91_AUTH_KEY, MSG91_TEMPLATE_ID, otpExpiry, otpLength } from '../config';
import { logger } from '../logger/winston';

const baseUrl = `https://api.msg91.com/api/v5/otp`;

const headers = {
    'Content-Type': 'application/json'
};

export const sendOtp = async (phoneNumber: string) => {
    axios({
        method: 'get',
        url: `${baseUrl}?authkey=${MSG91_AUTH_KEY}&template_id=${MSG91_TEMPLATE_ID}&mobile=${phoneNumber}&otp_length=${otpLength}&otp_expiry=${otpExpiry}`,
        headers
    })
        .then((response) => {
            logger.info(`otp.send.info ${JSON.stringify(response.data)}`);
        })
        .catch((error) => {
            logger.error(`otp.send.error ${error}`);
        });
};

export const verifyOtp = async (phoneNumber: string, otp: string) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `${baseUrl}/verify?otp_expiry=${otpExpiry}&mobile=${phoneNumber}&otp=${otp}&authkey=${MSG91_AUTH_KEY}`,
            headers
        })
            .then((response) => {
                logger.info(`otp.verify.info ${JSON.stringify(response.data)}`);
                resolve(response.data.type);
            })
            .catch((error) => {
                logger.error(`otp.verify.error ${error}`);
                reject();
            });
    });
};

export const resendOtp = async (phoneNumber: string) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `${baseUrl}/retry?mobile=${phoneNumber}&authkey=${MSG91_AUTH_KEY}`,
            headers
        })
            .then((response) => {
                logger.info(`otp.resend.info ${JSON.stringify(response.data)}`);
                resolve(response.data);
            })
            .catch((error) => {
                logger.error(`otp.resend.error ${error}`);
                reject();
            });
    });
};
