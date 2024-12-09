"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = require("jsonwebtoken");
describe('Conversation API', () => {
    let token;
    let userId;
    beforeEach(async () => {
        // 创建测试用户
        const user = await user_model_1.User.create({
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        });
        userId = user._id.toString();
        token = (0, jsonwebtoken_1.sign)({ id: userId }, process.env.JWT_SECRET);
    });
    describe('POST /api/conversations', () => {
        it('should create a new conversation', async () => {
            const response = await (0, supertest_1.default)(app_1.app)
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
            await (0, supertest_1.default)(app_1.app)
                .post('/api/conversations')
                .send({ message: 'Hello, AI!' })
                .expect(401);
        });
        it('should return 400 if message is empty', async () => {
            await (0, supertest_1.default)(app_1.app)
                .post('/api/conversations')
                .set('Authorization', `Bearer ${token}`)
                .send({ message: '' })
                .expect(400);
        });
    });
    describe('GET /api/conversations', () => {
        it('should return all conversations for user', async () => {
            // ��创建一些测试对话
            await (0, supertest_1.default)(app_1.app)
                .post('/api/conversations')
                .set('Authorization', `Bearer ${token}`)
                .send({ message: 'First conversation' });
            await (0, supertest_1.default)(app_1.app)
                .post('/api/conversations')
                .set('Authorization', `Bearer ${token}`)
                .send({ message: 'Second conversation' });
            const response = await (0, supertest_1.default)(app_1.app)
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
            const createResponse = await (0, supertest_1.default)(app_1.app)
                .post('/api/conversations')
                .set('Authorization', `Bearer ${token}`)
                .send({ message: 'Test conversation' });
            const conversationId = createResponse.body.data.conversationId;
            const response = await (0, supertest_1.default)(app_1.app)
                .get(`/api/conversations/${conversationId}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
            expect(response.body.code).toBe(200);
            expect(response.body.data.conversation.title).toBe('Test conversation');
            expect(response.body.data.messages).toHaveLength(2); // 用户消息和AI响应
        });
        it('should return 404 for non-existent conversation', async () => {
            await (0, supertest_1.default)(app_1.app)
                .get('/api/conversations/507f1f77bcf86cd799439011')
                .set('Authorization', `Bearer ${token}`)
                .expect(404);
        });
    });
    describe('POST /api/conversations/:id/messages', () => {
        it('should add message to conversation', async () => {
            // 创建测试对话
            const createResponse = await (0, supertest_1.default)(app_1.app)
                .post('/api/conversations')
                .set('Authorization', `Bearer ${token}`)
                .send({ message: 'Initial message' });
            const conversationId = createResponse.body.data.conversationId;
            const response = await (0, supertest_1.default)(app_1.app)
                .post(`/api/conversations/${conversationId}/messages`)
                .set('Authorization', `Bearer ${token}`)
                .send({ message: 'Follow-up message' })
                .expect(200);
            expect(response.body.code).toBe(200);
            expect(response.body.data.message.content).toBe('Follow-up message');
            expect(response.body.data.reply).toHaveProperty('content');
        });
        it('should return 404 for non-existent conversation', async () => {
            await (0, supertest_1.default)(app_1.app)
                .post('/api/conversations/507f1f77bcf86cd799439011/messages')
                .set('Authorization', `Bearer ${token}`)
                .send({ message: 'Test message' })
                .expect(404);
        });
    });
});
