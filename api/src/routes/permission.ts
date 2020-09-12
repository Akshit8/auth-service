import { Router } from 'express';
import {
    addPermissionController,
    deletePermissionController,
    getAllPermissionsController,
    getPermissionController,
    updatePermissionController
} from '../controllers';

const router: Router = Router();

router.post('/add', addPermissionController);
router.get('/get/:permissionID', getPermissionController);
router.get('/allPermissions', getAllPermissionsController);
router.patch('/update/:permissionID', updatePermissionController);
router.delete('/delete/:permissionID', deletePermissionController);

export default router;
