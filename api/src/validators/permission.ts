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
