import { Router } from 'express';
import user from './user';
import role from './role';
import permission from './permission';

const router = Router();

router.use('/user', user);
router.use('/role', role);
router.use('/permission', permission);

export default router;
