import { Router } from 'express';
import {
    addPermissionController,
    deletePermissionController,
    getAllPermissionsController,
    getPermissionController,
    updatePermissionController
} from '../controllers';
import { addPermissionSchema, allPermissionSchema, headerSchema, validate } from '../validators';

const router: Router = Router();

router.post('/add', headerSchema(), addPermissionSchema(), validate, addPermissionController);
router.get('/get/:permissionID', getPermissionController);
router.get('/allPermissions', allPermissionSchema(), validate, getAllPermissionsController);
router.patch('/update/:permissionID', updatePermissionController);
router.delete('/delete/:permissionID', deletePermissionController);

export default router;
