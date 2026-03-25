import { Router } from 'express';
import { getProfile, createProfile, updateProfile } from '../controllers/profile.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use(authenticateToken); // Protect all profile routes

router.get('/', getProfile);
router.post('/', createProfile);
router.put('/', updateProfile);

export default router;
