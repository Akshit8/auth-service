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
import { addUserSchema, headerSchema, updateUserRoleSchema, validate } from '../validators';

const router: Router = Router();

router.post('/add', headerSchema(), addUserSchema(), validate, addUserController);
router.get('/get/:userID', getUserController);
router.get('/allUsers', getAllUsersController);
router.patch('/update/:userID', updateUserController);
router.delete('/delete/:userID', deleteUserController);

router.patch('/addRole/:userID', headerSchema(), updateUserRoleSchema(), validate, addUserRoleController);
router.delete('/deleteRole/:userID', headerSchema(), updateUserRoleSchema(), validate, deleteUserRoleController);

export default router;
