import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chatapp';

const options = {
  autoIndex: true, // 在生产环境可以设为 false
  serverSelectionTimeoutMS: 5000, // 超时时间
  socketTimeoutMS: 45000, // Socket 超时时间
};

mongoose.set('strictQuery', false);

export const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...', MONGODB_URI);
    const conn = await mongoose.connect(MONGODB_URI, options);

    mongoose.connection.on('connected', () => {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      console.log(`Database Name: ${conn.connection.name}`);
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    // 测试连接
    await mongoose.connection.db.admin().ping();
    console.log('Successfully connected to MongoDB and database ping successful');

    return conn;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}; 