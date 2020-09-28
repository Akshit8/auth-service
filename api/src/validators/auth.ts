import { body, oneOf } from 'express-validator';
import { message } from '../config';

export const loginAndResendSchema = () => {
    return [
        body('userName')
            .exists({ checkNull: true, checkFalsy: true })
            .withMessage(message.userNameRequired)
            .isLength({ min: 5 })
            .withMessage(message.invalidUserName)
            .trim()
    ];
};

export const verifySchema = () => {
    return [
        body('userName')
            .exists({ checkNull: true, checkFalsy: true })
            .withMessage(message.userNameRequired)
            .isLength({ min: 5 })
            .withMessage(message.invalidUserName)
            .trim(),
        body('otp')
            .exists({ checkNull: true, checkFalsy: true })
            .withMessage(message.otpRequired)
            .custom((value: string) => value.length === 4)
            .withMessage(message.otpInvalid)
    ];
};
