"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockAIService = void 0;
exports.mockAIService = {
    generateResponse: jest.fn().mockResolvedValue('Mock AI response')
};
jest.mock('../../services/ai.service', () => ({
    AIService: exports.mockAIService
}));
