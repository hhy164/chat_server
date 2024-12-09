import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chatapp';

const options = {
  autoIndex: true, // 在生产环境可以设为 false
  serverSelectionTimeoutMS: 5000, // 超时时间
  socketTimeoutMS: 45000, // Socket 超时时间
};

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, options);

    // 数据库连接事件监听
    mongoose.connection.on('connected', () => {
      console.log('MongoDB Connected');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    // 应用退出时关闭数据库连接
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      process.exit(0);
    });

    return conn;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}; 