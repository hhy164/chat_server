import axios from 'axios';
import { AI_CONFIG } from '../config/ai.config';

export class AIService {
  static async generateResponse(message: string): Promise<string> {
    try {
      const response = await axios.post(
        AI_CONFIG.MODEL_URL,
        { inputs: message },
        { headers: AI_CONFIG.headers }
      );

      return response.data[0].generated_text;
    } catch (error) {
      console.error('AI Response Error:', error);
      throw new Error('Failed to generate AI response');
    }
  }
} 