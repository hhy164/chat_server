import mongoose, { Schema } from 'mongoose';
import { IConversation } from '../types/models';

const conversationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  firstMessage: {
    type: String,
    required: [true, 'First message is required'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true, // 自动管理 createdAt 和 updatedAt
  toJSON: { virtuals: true }, // 在 JSON 中包含虚拟字段
  toObject: { virtuals: true }
});

// 添加索引
conversationSchema.index({ userId: 1, createdAt: -1 });

// 添加虚拟字段
conversationSchema.virtual('messageCount', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'conversationId',
  count: true
});

export const Conversation = mongoose.model<IConversation>('Conversation', conversationSchema); 