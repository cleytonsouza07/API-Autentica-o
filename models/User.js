import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  tokenVersion: { type: Number, default: 0 }, // para invalidação de refresh tokens
}, { timestamps: true });

userSchema.methods.toSafeJSON = function() {
  return { id: this._id.toString(), name: this.name, email: this.email, createdAt: this.createdAt, updatedAt: this.updatedAt };
};

export const User = mongoose.model('User', userSchema);
