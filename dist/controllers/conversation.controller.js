"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationController = void 0;
const conversation_model_1 = require("../models/conversation.model");
const message_model_1 = require("../models/message.model");
const ai_service_1 = require("../services/ai.service");
class ConversationController {
    static async createConversation(req, res) {
        try {
            const { message } = req.body;
            // 添加用户检查
            if (!req.user) {
                return res.status(401).json({
                    code: 401,
                    message: 'Unauthorized: User not found'
                });
            }
            const userId = req.user.id;
            // 创建新对话
            const conversation = await conversation_model_1.Conversation.create({
                userId,
                title: message,
                firstMessage: message
            });
            // 保存用户消息
            const userMessage = await message_model_1.Message.create({
                conversationId: conversation._id,
                role: 'user',
                content: message
            });
            // 获取AI响应
            const aiResponse = await ai_service_1.AIService.generateResponse(message);
            // 保存AI响应
            const assistantMessage = await message_model_1.Message.create({
                conversationId: conversation._id,
                role: 'assistant',
                content: aiResponse
            });
            res.status(200).json({
                code: 200,
                data: {
                    conversationId: conversation._id,
                    title: conversation.title,
                    message: userMessage,
                    reply: assistantMessage
                }
            });
        }
        catch (error) {
            console.error('Create Conversation Error:', error);
            res.status(500).json({
                code: 500,
                message: 'Failed to create conversation'
            });
        }
    }
    static async sendMessage(req, res) {
        try {
            const { conversationId } = req.params;
            const { message } = req.body;
            // 保存用户消息
            const userMessage = await message_model_1.Message.create({
                conversationId,
                role: 'user',
                content: message
            });
            // 获取AI响应
            const aiResponse = await ai_service_1.AIService.generateResponse(message);
            // 保存AI响应
            const assistantMessage = await message_model_1.Message.create({
                conversationId,
                role: 'assistant',
                content: aiResponse
            });
            res.status(200).json({
                code: 200,
                data: {
                    message: userMessage,
                    reply: assistantMessage
                }
            });
        }
        catch (error) {
            console.error('Send Message Error:', error);
            res.status(500).json({
                code: 500,
                message: 'Failed to send message'
            });
        }
    }
    static async getConversations(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({
                    code: 401,
                    message: 'Unauthorized: User not found'
                });
            }
            const conversations = await conversation_model_1.Conversation.find({ userId: req.user.id })
                .sort({ updatedAt: -1 })
                .populate('messageCount');
            res.status(200).json({
                code: 200,
                data: { conversations }
            });
        }
        catch (error) {
            console.error('Get Conversations Error:', error);
            res.status(500).json({
                code: 500,
                message: 'Failed to get conversations'
            });
        }
    }
    static async getConversation(req, res) {
        try {
            const { conversationId } = req.params;
            if (!req.user) {
                return res.status(401).json({
                    code: 401,
                    message: 'Unauthorized: User not found'
                });
            }
            const conversation = await conversation_model_1.Conversation.findOne({
                _id: conversationId,
                userId: req.user.id
            });
            if (!conversation) {
                return res.status(404).json({
                    code: 404,
                    message: 'Conversation not found'
                });
            }
            const messages = await message_model_1.Message.find({ conversationId })
                .sort({ createdAt: 1 });
            res.status(200).json({
                code: 200,
                data: {
                    conversation,
                    messages
                }
            });
        }
        catch (error) {
            console.error('Get Conversation Error:', error);
            res.status(500).json({
                code: 500,
                message: 'Failed to get conversation'
            });
        }
    }
}
exports.ConversationController = ConversationController;
