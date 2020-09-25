import { Router } from 'express';
import { loginController, logoutController, otpVerifyController, resendController } from '../controllers';
import { headerSchema, validate } from '../validators';
import { loginAndResendSchema, verifySchema } from '../validators/auth';

const router: Router = Router();

router.post('/login', loginAndResendSchema(), validate, loginController);
router.post('/verify', verifySchema(), validate, otpVerifyController);
router.post('/resend', loginAndResendSchema(), validate, resendController);
router.get('/logout', headerSchema(), validate, logoutController);

export default router;
