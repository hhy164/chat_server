import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// 加载测试环境的环境变量
dotenv.config({ path: path.join(__dirname, '../../.env.test') });

beforeAll(async () => {
  try {
    console.log('Test setup: Connecting to MongoDB...');
    console.log('MONGODB_URI:', process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI as string);

    // 验证连接
    const isConnected = mongoose.connection.readyState === 1;
    console.log('MongoDB connection status:', isConnected ? 'Connected' : 'Not connected');

    if (!isConnected) {
      throw new Error('Failed to connect to MongoDB');
    }
  } catch (error) {
    console.error('Test setup failed:', error);
    throw error;
  }
});

afterAll(async () => {
  console.log('Test teardown: Closing MongoDB connection...');
  await mongoose.connection.close();
});

afterEach(async () => {
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
}); 