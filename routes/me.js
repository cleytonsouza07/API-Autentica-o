import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.js';

const router = Router();

router.get('/', authMiddleware, async (req, res) => {
  return res.json({ user: req.user.toSafeJSON() });
});

export default router;
