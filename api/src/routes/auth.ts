import { Router } from 'express';
import { loginController, logoutController, otpVerifyController, resendController } from '../controllers';

const router: Router = Router();

router.post('/login', loginController);
router.post('/verify', otpVerifyController);
router.get('/resend', resendController);
router.get('/logout', logoutController);

export default router;
