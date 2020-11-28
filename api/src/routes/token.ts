import { Router } from 'express';
import { verifyTokenController } from '../controllers';
import { headerSchema, validate } from '../validators';

const router: Router = Router();

router.get('/verify', headerSchema(), validate, verifyTokenController);

export default router;