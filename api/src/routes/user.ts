import { Router } from 'express';
import {
    addUserController,
    addUserRolesController,
    deleteUserController,
    deleteUserRolesController,
    getAllUsersController,
    getUserController,
    updateUserController,
    updateUserRolesController
} from '../controllers';

const router: Router = Router();

router.post('/add', addUserController);
router.get('/get/:userID', getUserController);
router.get('/allUsers', getAllUsersController);
router.patch('/update/:userID', updateUserController);
router.delete('/delete/:userID', deleteUserController);

router.post('/addRoles/:userID', addUserRolesController);
router.patch('/updateRoles/:userID', updateUserRolesController);
router.delete('/deleteRoles/:userID', deleteUserRolesController);

// roles info will be dispayed with above get routes

export default router;
