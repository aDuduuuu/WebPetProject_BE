import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/PetProject';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      // Xóa các tùy chọn không còn cần thiết
      serverSelectionTimeoutMS: 5000, // Tùy chọn thời gian chờ kết nối, nếu cần
    });
    console.log(`Connected to MongoDB: ${mongoURI}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Thoát chương trình nếu không kết nối được
  }
};

export default connectDB;
