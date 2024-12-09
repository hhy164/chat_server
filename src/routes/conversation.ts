import express from 'express';
import { ConversationController } from '../controllers/conversation.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateMessage } from '../middlewares/validation.middleware';

const router = express.Router();

router.post('/', authMiddleware, validateMessage, ConversationController.createConversation);
router.post('/:conversationId/messages', authMiddleware, validateMessage, ConversationController.sendMessage);
router.get('/', authMiddleware, ConversationController.getConversations);
router.get('/:conversationId', authMiddleware, ConversationController.getConversation);

export default router; 