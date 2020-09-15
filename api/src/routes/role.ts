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

const router: Router = Router();

router.post('/add', addRoleController);
router.get('/get/:roleID', getRoleController);
router.get('/allRoles', getAllRolesController);
router.patch('/update/:roleID', updateRoleController);
router.delete('/delete/:roleID', deleteRoleController);

router.patch('/addPermission/:roleID', addRolePermissionController);
router.delete('/deletePermission/:roleID', deleteRolePermissionController);

export default router;
