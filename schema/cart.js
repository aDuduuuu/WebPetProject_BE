const mongoose = require('../mongoose');

const cartSchema = new mongoose.Schema({
  cartID: { type: Number, required: true, unique: true },
  userID: { type: Number, required: true },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CartItem'
  }]
});

module.exports = cartSchema;