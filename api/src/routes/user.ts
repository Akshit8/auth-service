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

export default router;
