import mongoose from 'mongoose';

const dogNameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default dogNameSchema;