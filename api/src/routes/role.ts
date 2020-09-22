import { Router } from 'express';
import {
    addRoleController,
    addRolePermissionController,
    deleteRoleController,
    deleteRolePermissionController,
    getAllRolesController,
    getRoleController,
    updateRoleController
} from '../controllers';
import {
    addRoleSchema,
    headerSchema,
    paginationSchema,
    updateRolePermissionsSchema,
    updateRoleSchema,
    validate
} from '../validators';

const router: Router = Router();

router.post('/add', headerSchema(), addRoleSchema(), validate, addRoleController);
router.get('/get/:roleID', getRoleController);
router.get('/allRoles', paginationSchema(), validate, getAllRolesController);
router.patch('/update/:roleID', updateRoleSchema(), validate, updateRoleController);
router.delete('/delete/:roleID', deleteRoleController);

router.patch('/addPermission/:roleID', updateRolePermissionsSchema, addRolePermissionController);
router.delete('/deletePermission/:roleID', updateRolePermissionsSchema, deleteRolePermissionController);

export default router;
