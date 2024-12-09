export const mockAIService = {
  generateResponse: jest.fn().mockResolvedValue('Mock AI response')
};

jest.mock('../../services/ai.service', () => ({
  AIService: mockAIService
})); 