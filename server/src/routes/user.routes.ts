import { sanitize } from '@/middlewares/sanitizeInput';
import { Router } from 'express';
import search from '../controllers/user/search';
import Authentication from '@/middlewares/Authentication';
import updateProfile from '@/controllers/user/updateProfile';
import updateProfileRequest from '@/middlewares/user/updateProfileRequest';
import follow from '@/controllers/user/follow';
import loadUser from '@/controllers/user/loadUser';

const router = Router();

router.get('/', sanitize, search);
router.get('/profile/:username', sanitize, Authentication.optional, loadUser);
router.put(
  '/profile',
  sanitize,
  Authentication.required,
  updateProfileRequest,
  updateProfile
);
router.put('/follow', sanitize, Authentication.required, follow);

export default router;
