import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  itemID: { type: Number, required: true, unique: true },
  product: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true 
  },
  quantity: { type: Number, required: true }
});

export default cartItemSchema;