import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  done: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const Todo = mongoose.model('Todo', todoSchema);
