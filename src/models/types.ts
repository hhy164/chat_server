import { Document } from 'mongoose';

export interface IConversation extends Document {
  userId: string;
  title: string;
  firstMessage: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage extends Document {
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
} 