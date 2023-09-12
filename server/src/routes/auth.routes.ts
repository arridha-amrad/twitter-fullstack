import { sanitize } from '@/middlewares/sanitizeInput';
import { Router } from 'express';
import login from '../modules/user/auth-controllers/login';
import logout from '../modules/user/auth-controllers/logout';
import me from '../modules/user/auth-controllers/me';
import refreshToken from '../modules/user/auth-controllers/refresh';
import register from '../modules/user/auth-controllers/register';
import { resetToken } from '../modules/user/utils/resetToken';
import { validateRegister } from '../modules/user/validators/validateRegister';
import Authentication from '../middlewares/Authentication';

const router = Router();

router.post('/login', resetToken, sanitize, login);

router.post('/register', sanitize, validateRegister, register);

router.get('/refresh-token', refreshToken);

router.get('/logout', logout);

router.get('/me', Authentication.require, me);

export default router;
