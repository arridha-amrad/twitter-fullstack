import { sanitize } from '@/middlewares/sanitizeInput';
import { Router } from 'express';
import login from '../controllers/auth/login';
import logout from '../modules/user/auth-controllers/logout';
import me from '../modules/user/auth-controllers/me';
import refreshToken from '../modules/user/auth-controllers/refresh';
import register from '../modules/user/auth-controllers/register';
import { resetToken } from '../middlewares/resetToken';
import { validateRegister } from '../validators/validateRegister';
import Authentication from '../middlewares/Authentication';

const router = Router();

router.post('/login', resetToken, sanitize, login);

router.post('/register', sanitize, validateRegister, register);

router.get('/refresh-token', refreshToken);

router.get('/logout', logout);

router.get('/me', Authentication.require, me);

export default router;
