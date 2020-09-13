import { Router } from 'express';

const router: Router = Router();

router.post('/login');
router.post('/verify');
router.get('/resend/:phoneNumber');
router.get('/logout');

export default router;
