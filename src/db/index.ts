import mongoose from 'mongoose';
import { config } from '../config';

export const db = {
  connect: async () => {
    try {
      mongoose.set('strictQuery', false);
      await mongoose.connect(config.mongoUri);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  }
}; 