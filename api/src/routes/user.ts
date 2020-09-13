import { Router } from 'express';
import {
    addUserController,
    deleteUserController,
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

router.post('/addRoles');
router.patch('/updateRoles/:userID');
router.delete('/deleteRoles/:userID');

// roles info will be dispayed with above get routes

export default router;
