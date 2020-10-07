import { Router } from 'express';
import { logoutController } from '../../controllers';
import { headerSchema, validate } from '../../validators';

import otp from './otp';
import username from './username';

const router: Router = Router();

router.use('/otp', otp);
router.use('/username', username);

router.get('/logout', headerSchema(), validate, logoutController);

export default router;
