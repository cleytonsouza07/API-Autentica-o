import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { registerSchema, loginSchema, refreshSchema } from '../validators/authSchemas.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt.js';

const router = Router();

router.post('/register', async (req, res) => {
  const parse = registerSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });

  const { name, email, password } = parse.data;

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ error: 'Email já cadastrado' });

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, passwordHash });
  const payload = { sub: user._id.toString(), email: user.email, tv: user.tokenVersion };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  return res.status(201).json({
    user: user.toSafeJSON(),
    accessToken,
    refreshToken,
  });
});

router.post('/login', async (req, res) => {
  const parse = loginSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });

  const { email, password } = parse.data;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Credenciais inválidas' });

  const payload = { sub: user._id.toString(), email: user.email, tv: user.tokenVersion };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  return res.json({
    user: user.toSafeJSON(),
    accessToken,
    refreshToken,
  });
});

router.post('/refresh', async (req, res) => {
  const parse = refreshSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });

  const { refreshToken } = parse.data;

  try {
    const decoded = verifyRefreshToken(refreshToken);
    const userId = decoded.sub;
    const user = await (await (await import('../models/User.js'))).User.findById(userId);
    if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });

    // Checa se a versão do token ainda é válida (possibilidade de invalidar antigos)
    if (decoded.tv !== user.tokenVersion) {
      return res.status(401).json({ error: 'Refresh token inválido' });
    }

    const payload = { sub: user._id.toString(), email: user.email, tv: user.tokenVersion };
    const accessToken = signAccessToken(payload);
    const newRefreshToken = signRefreshToken(payload);

    return res.json({ accessToken, refreshToken: newRefreshToken, user: user.toSafeJSON() });
  } catch (err) {
    return res.status(401).json({ error: 'Refresh token inválido ou expirado' });
  }
});

export default router;
