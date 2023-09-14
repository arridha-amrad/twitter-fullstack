import logout from '@/controllers/auth/logout';
import me from '@/controllers/auth/me';
import refreshToken from '@/controllers/auth/refreshToken';
import register from '@/controllers/auth/register';
import { sanitize } from '@/middlewares/sanitizeInput';
import { Router } from 'express';
import login from '../controllers/auth/login';
import Authentication from '../middlewares/Authentication';
import { resetToken } from '../middlewares/resetToken';
import { validateRegister } from '../middlewares/user/registerRequest';

const router = Router();

router.post('/login', resetToken, sanitize, login);

router.post('/register', sanitize, validateRegister, register);

router.get('/refresh-token', refreshToken);

router.get('/logout', logout);

router.get('/me', Authentication.required, me);

export default router;
