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
router.get('/get/:roleID', getRoleController);
router.get('/allRoles', getAllRolesController);
router.patch('/update/:roleID', updateRoleController);
router.delete('/delete/:roleID', deleteRoleController);

export default router;
