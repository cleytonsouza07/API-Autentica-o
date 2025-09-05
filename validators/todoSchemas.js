import { z } from 'zod';

export const createTodoSchema = z.object({
  title: z.string().min(1).max(200),
  done: z.boolean().optional(),
});

export const updateTodoSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  done: z.boolean().optional(),
}).refine(data => Object.keys(data).length > 0, { message: 'Nada para atualizar' });
