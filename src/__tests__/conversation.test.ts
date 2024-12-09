import request from 'supertest';
import { app } from '../app';
import { User } from '../models/user.model';
import { sign } from 'jsonwebtoken';
import { Types } from 'mongoose';

describe('Conversation API', () => {
  let token: string;
  let userId: string;

  beforeEach(async () => {
    // 创建测试用户
    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    userId = (user._id as Types.ObjectId).toString();
    token = sign({ id: userId }, process.env.JWT_SECRET as string);
  });

  describe('POST /api/conversations', () => {
    it('should create a new conversation', async () => {
      const response = await request(app)
        .post('/api/conversations')
        .set('Authorization', `Bearer ${token}`)
        .send({ message: 'Hello, AI!' })
        .expect(200);

      expect(response.body.code).toBe(200);
      expect(response.body.data).toHaveProperty('conversationId');
      expect(response.body.data.title).toBe('Hello, AI!');
      expect(response.body.data.message.content).toBe('Hello, AI!');
      expect(response.body.data.reply).toHaveProperty('content');
    });

    it('should return 401 if no token provided', async () => {
      await request(app)
        .post('/api/conversations')
        .send({ message: 'Hello, AI!' })
        .expect(401);
    });

    it('should return 400 if message is empty', async () => {
      await request(app)
        .post('/api/conversations')
        .set('Authorization', `Bearer ${token}`)
        .send({ message: '' })
        .expect(400);
    });
  });

  describe('GET /api/conversations', () => {
    it('should return all conversations for user', async () => {
      // ��创建一些测试对话
      await request(app)
        .post('/api/conversations')
        .set('Authorization', `Bearer ${token}`)
        .send({ message: 'First conversation' });

      await request(app)
        .post('/api/conversations')
        .set('Authorization', `Bearer ${token}`)
        .send({ message: 'Second conversation' });

      const response = await request(app)
        .get('/api/conversations')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.code).toBe(200);
      expect(response.body.data.conversations).toHaveLength(2);
      expect(response.body.data.conversations[0]).toHaveProperty('messageCount');
    });
  });

  describe('GET /api/conversations/:id', () => {
    it('should return conversation details with messages', async () => {
      // 创建测试对话
      const createResponse = await request(app)
        .post('/api/conversations')
        .set('Authorization', `Bearer ${token}`)
        .send({ message: 'Test conversation' });

      const conversationId = createResponse.body.data.conversationId;

      const response = await request(app)
        .get(`/api/conversations/${conversationId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.code).toBe(200);
      expect(response.body.data.conversation.title).toBe('Test conversation');
      expect(response.body.data.messages).toHaveLength(2); // 用户消息和AI响应
    });

    it('should return 404 for non-existent conversation', async () => {
      await request(app)
        .get('/api/conversations/507f1f77bcf86cd799439011')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });

  describe('POST /api/conversations/:id/messages', () => {
    it('should add message to conversation', async () => {
      // 创建测试对话
      const createResponse = await request(app)
        .post('/api/conversations')
        .set('Authorization', `Bearer ${token}`)
        .send({ message: 'Initial message' });

      const conversationId = createResponse.body.data.conversationId;

      const response = await request(app)
        .post(`/api/conversations/${conversationId}/messages`)
        .set('Authorization', `Bearer ${token}`)
        .send({ message: 'Follow-up message' })
        .expect(200);

      expect(response.body.code).toBe(200);
      expect(response.body.data.message.content).toBe('Follow-up message');
      expect(response.body.data.reply).toHaveProperty('content');
    });

    it('should return 404 for non-existent conversation', async () => {
      await request(app)
        .post('/api/conversations/507f1f77bcf86cd799439011/messages')
        .set('Authorization', `Bearer ${token}`)
        .send({ message: 'Test message' })
        .expect(404);
    });
  });
}); 