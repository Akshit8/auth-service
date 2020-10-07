import { Router } from 'express';
import { usernameLoginController } from '../../controllers';

const router: Router = Router();

router.post('/login', usernameLoginController);

export default router;
