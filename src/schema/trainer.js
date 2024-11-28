import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  location: {
      province: { type: String },
      district: { type: String },
      ward: { type: String },
      street: { type: String }
  },
  services: [{ type: String }],
  description: {type:String},
  contactInfo: {
      phone: { type: String },
      email: { type: String }
  }
});

export default trainerSchema;