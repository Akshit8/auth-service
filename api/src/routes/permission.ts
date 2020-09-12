import { Router } from 'express';

const router: Router = Router();

router.post('/add');
router.get('/get/:permissionID');
router.get('/allPermissions');
router.patch('/update/:permissionID');
router.delete('/delete/:permissionID');

export default router;
