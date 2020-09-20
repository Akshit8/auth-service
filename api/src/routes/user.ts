import { Router } from 'express';
import {
    addUserController,
    addUserRoleController,
    deleteUserController,
    deleteUserRoleController,
    getAllUsersController,
    getUserController,
    updateUserController
} from '../controllers';

const router: Router = Router();

router.post('/add', addUserController);
router.get('/get/:userID', getUserController);
router.get('/allUsers', getAllUsersController);
router.patch('/update/:userID', updateUserController);
router.delete('/delete/:userID', deleteUserController);

router.patch('/addRole/:userID', addUserRoleController);
router.delete('/deleteRole/:userID', deleteUserRoleController);

export default router;
