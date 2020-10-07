import { sign, verify } from 'jsonwebtoken';
import { jwtExpiry, JWT_SECRET } from '../config';
import { logger } from '../logger';
import { jwtPayloadInterface } from '../models';

export const getJwtToken = async (jwtPayload: jwtPayloadInterface) => {
    return new Promise((resolve, reject) => {
        sign(jwtPayload, JWT_SECRET, { expiresIn: jwtExpiry }, function (err, token) {
            if (err) {
                logger.error(`jwt.sign.error ${err}`);
                reject();
            } else {
                resolve(token);
            }
        });
    });
};
