import { Router } from 'express';
import { otpLoginController, otpVerifyController, otpResendController } from '../../controllers';
import { validate } from '../../validators';
import { loginAndResendSchema, verifySchema } from '../../validators/auth';

const router: Router = Router();

router.post('/login', loginAndResendSchema(), validate, otpLoginController);
router.post('/verify', verifySchema(), validate, otpVerifyController);
router.post('/resend', loginAndResendSchema(), validate, otpResendController);

export default router;
