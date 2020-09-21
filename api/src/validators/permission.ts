import { body, query } from 'express-validator';
import { message } from '../config';

export const addPermissionSchema = () => {
    return [
        body('permissionName')
            .exists({ checkNull: true, checkFalsy: true })
            .withMessage(message.permissionNameRequired)
            .trim(),
        body('description')
            .exists({ checkNull: true, checkFalsy: true })
            .withMessage(message.permissionDescriptionRequired)
            .isLength({ min: 15 })
            .withMessage(message.permissionDescriptionShort)
            .trim()
    ];
};

export const allPermissionSchema = () => {
    return [
        query('skip').exists().withMessage(message.skipParameterRequired).isNumeric(),
        query('limit').exists().withMessage(message.limitParameterRequired).isNumeric()
    ];
};
