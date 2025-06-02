import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  productCode: { type: String, unique: true, required: true },
  image: { type: String },
  productType: { type: String, required: true },
  price: { type: Number, required: true },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  }
  ,
  quantity: { type: Number, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default productSchema;