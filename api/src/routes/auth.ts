import { Router } from 'express';
import { loginController, otpVerifyController } from '../controllers';

const router: Router = Router();

router.post('/login', loginController);
router.post('/verify', otpVerifyController);
router.get('/resend');
router.get('/logout');

export default router;
