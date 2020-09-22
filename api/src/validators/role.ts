import { body, oneOf } from 'express-validator';
import { message } from '../config';

export const addRoleSchema = () => {
    return [
        body('roleName')
            .exists({ checkNull: true, checkFalsy: true })
            .withMessage(message.roleNameRequired)
            .custom((value: string) => value.match(/\D\D\D[_]\D\D\D/))
            .withMessage(message.invalidRoleName),
        body('description')
            .exists({ checkNull: true, checkFalsy: true })
            .withMessage(message.roleDescriptionRequired)
            .isLength({ min: 15 })
            .withMessage(message.roleDescriptionShort)
            .trim(),
        body('permissions')
            .exists({ checkNull: true, checkFalsy: true })
            .withMessage(message.rolePermissionRequired)
            .custom((value: string[]) => value.length !== 0)
            .withMessage(message.rolePermissionEmpty)
    ];
};

export const updateRoleSchema = () => {
    return [
        oneOf(
            [
                body('description').exists({ checkNull: true, checkFalsy: true }).isLength({ min: 15 }).trim(),
                body('permissions')
                    .exists({ checkNull: true, checkFalsy: true })
                    .custom((value: string[]) => value.length !== 0)
            ],
            message.invalidParameters
        )
    ];
};

export const updateRolePermissionsSchema = () => {
    return [
        body('permissions')
            .exists({ checkNull: true, checkFalsy: true })
            .withMessage(message.rolePermissionRequired)
            .custom((value: string[]) => value.length !== 0)
            .withMessage(message.rolePermissionEmpty)
    ];
};
