import { Router } from 'express';
import {
    addRoleController,
    deleteRoleController,
    getAllRolesController,
    getRoleController,
    updateRoleController
} from '../controllers';

const router: Router = Router();

router.post('/add', addRoleController);
router.get('/get', getRoleController);
router.get('/allRoles', getAllRolesController);
router.patch('/update', updateRoleController);
router.delete('/delete', deleteRoleController);

export default router;
