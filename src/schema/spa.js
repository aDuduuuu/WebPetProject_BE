import mongoose from 'mongoose';

const spaSchema = new mongoose.Schema({
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
  },
  workingHours: {
    monday: { type: String },
    tuesday: { type: String },
    wednesday: { type: String },
    thursday: { type: String },
    friday: { type: String },
    saturday: { type: String },
    sunday: { type: String },
  },
});

export default spaSchema;