import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  lastLoginAt: Date;
}

export interface IConversation extends Document {
  userId: Types.ObjectId;
  title: string;
  firstMessage: string;
  createdAt: Date;
  updatedAt: Date;
  messageCount?: number;
}

export interface IMessage extends Document {
  conversationId: Types.ObjectId;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
} 