import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  cartID: { type: Number, required: true, unique: true },
  userID: { type: Number, required: true },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CartItem'
  }]
});

export default cartSchema;