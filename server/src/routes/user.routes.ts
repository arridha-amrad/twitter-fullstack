import { sanitize } from '@/middlewares/sanitizeInput';
import { Router } from 'express';
import search from '../controllers/user/search';

const router = Router();

router.get('/', sanitize, search);

export default router;
