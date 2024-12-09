"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conversation_controller_1 = require("../controllers/conversation.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const router = express_1.default.Router();
router.post('/', auth_middleware_1.authMiddleware, validation_middleware_1.validateMessage, conversation_controller_1.ConversationController.createConversation);
router.post('/:conversationId/messages', auth_middleware_1.authMiddleware, validation_middleware_1.validateMessage, conversation_controller_1.ConversationController.sendMessage);
router.get('/', auth_middleware_1.authMiddleware, conversation_controller_1.ConversationController.getConversations);
router.get('/:conversationId', auth_middleware_1.authMiddleware, conversation_controller_1.ConversationController.getConversation);
exports.default = router;
