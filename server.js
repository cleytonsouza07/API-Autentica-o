import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import { connectDB } from './db.js';
import authRoutes from './routes/auth.js';
import meRoutes from './routes/me.js';
import todoRoutes from './routes/todos.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true })); // CORS básico
app.use(express.json());
app.use(cookieParser());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/auth', authRoutes);
app.use('/me', meRoutes);
app.use('/todos', todoRoutes);

// Handler padrão de 404
app.use((req, res) => res.status(404).json({ error: 'Rota não encontrada' }));

// Handler de erros
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno' });
});

const start = async () => {
  await connectDB();
  app.listen(env.PORT, () => console.log(`🚀 Server running on http://localhost:${env.PORT}`));
};

start();
