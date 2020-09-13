import { Router } from 'express';
import user from './user';
import role from './role';
import permission from './permission';
import auth from './auth';

const router: Router = Router();

router.use('/user', user);
router.use('/role', role);
router.use('/permission', permission);
router.use('/#', auth);

export default router;
