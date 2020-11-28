import { sign, verify } from 'jsonwebtoken';
import { jwtExpiry, JWT_SECRET, message, statusCode } from '../config';
import { logger } from '../logger';
import { jwtPayloadInterface, jwtVerifyInterface } from '../models';

export const getJwtToken = async (jwtPayload: jwtPayloadInterface) => {
    return new Promise((resolve, reject) => {
        sign(jwtPayload, JWT_SECRET, { expiresIn: jwtExpiry }, (err: any, token: any) => {
            if (err) {
                logger.error(`jwt.sign.error ${err}`);
                reject();
            } else {
                resolve(token);
            }
        });
    });
};

export const verifyJwtToken = async (token: string): Promise<jwtVerifyInterface> => {
    return new Promise((resolve) => {
        verify(token, JWT_SECRET, (err: any, decodedPayload: any) => {
            if (err) {
                logger.error(`jwt.verify.error${err}`);
                resolve({
                    status: statusCode.unauthorized,
                    message: message.invalidToken,
                    payload: null
                });
            }
            resolve({
                status: statusCode.ok,
                message: message.validToken,
                payload: decodedPayload
            });
        });
    });
};
