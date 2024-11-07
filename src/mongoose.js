import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/PetProject';

const connectDB = async () => {
  try {
    const cnn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000 // Thời gian chờ kết nối là 5 giây
    });
    console.log(`MongoDB Connected: ${cnn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Thoát chương trình nếu không kết nối được
  }
};

export default connectDB;
