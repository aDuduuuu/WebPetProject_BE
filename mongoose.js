import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = 'mongodb+srv://anhdungkf:vKjCBJSLDX9AoVRO@cluster0.omjtl.mongodb.net/products?retryWrites=true&w=majority&appName=Cluster0';

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
