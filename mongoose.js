import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/PetProject';

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

export default mongoose;
