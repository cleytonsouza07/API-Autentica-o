import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { Todo } from '../models/Todo.js';
import { createTodoSchema, updateTodoSchema } from '../validators/todoSchemas.js';

const router = Router();

// Criar
router.post('/', authMiddleware, async (req, res) => {
  const parse = createTodoSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });

  const todo = await Todo.create({ ...parse.data, owner: req.user._id });
  return res.status(201).json(todo);
});

// Listar (apenas do usuário)
router.get('/', authMiddleware, async (req, res) => {
  const todos = await Todo.find({ owner: req.user._id }).sort({ createdAt: -1 });
  return res.json(todos);
});

// Obter por id
router.get('/:id', authMiddleware, async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id, owner: req.user._id });
  if (!todo) return res.status(404).json({ error: 'Todo não encontrado' });
  return res.json(todo);
});

// Atualizar
router.put('/:id', authMiddleware, async (req, res) => {
  const parse = updateTodoSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });

  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, owner: req.user._id },
    { $set: parse.data },
    { new: true }
  );
  if (!todo) return res.status(404).json({ error: 'Todo não encontrado' });
  return res.json(todo);
});

// Deletar
router.delete('/:id', authMiddleware, async (req, res) => {
  const todo = await Todo.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
  if (!todo) return res.status(404).json({ error: 'Todo não encontrado' });
  return res.status(204).send();
});

export default router;
