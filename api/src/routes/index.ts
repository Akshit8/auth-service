import { Router } from 'express';
import user from './user';
import role from './role';
import permission from './permission';
import auth from './auth';
import token from './token';

const router: Router = Router();

router.use('/user', user);
router.use('/role', role);
router.use('/permission', permission);
router.use('/_', auth);
router.use('/token', token);

export default router;
