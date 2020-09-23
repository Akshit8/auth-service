import { body, oneOf } from 'express-validator';
import { message } from '../config';

export const addUserSchema = () => {
    return [
        body('userName')
            .exists({ checkNull: true, checkFalsy: true })
            .withMessage(message.userNameRequired)
            .isLength({ min: 5 })
            .withMessage(message.invalidUserName)
            .trim(),
        body('phoneNumber')
            .exists({ checkNull: true, checkFalsy: true })
            .withMessage(message.userPhoneNumberRequired)
            .custom((value: string) => value.length === 13)
            .withMessage(message.invalidPhoneNumber)
            .trim(),
        body('serviceUserID')
            .exists({ checkNull: true, checkFalsy: true })
            .withMessage(message.serviceUserIDRequired)
            .isMongoId()
            .withMessage(message.invalidServiceUserID)
            .trim(),
        body('roles')
            .exists({ checkNull: true, checkFalsy: true })
            .withMessage(message.userRoleRequired)
            .custom((value: string[]) => value.length !== 0)
            .withMessage(message.userRoleEmpty)
    ];
};

export const updateUserSchema = () => {
    return [
        oneOf([
            body('userName').exists({ checkNull: true, checkFalsy: true }).isLength({ min: 5 }).trim(),
            body('phoneNumber')
                .exists({ checkNull: true, checkFalsy: true })
                .custom((value: string) => value.length === 13)
                .trim(),
            body('roles')
                .exists({ checkNull: true, checkFalsy: true })
                .custom((value: string[]) => value.length !== 0)
        ])
    ];
};

export const updateUserRoleSchema = () => {
    return [
        body('roles')
            .exists({ checkNull: true, checkFalsy: true })
            .withMessage(message.userRoleRequired)
            .custom((value: string[]) => value.length !== 0)
            .withMessage(message.userRoleEmpty)
    ];
};
