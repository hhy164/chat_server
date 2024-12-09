"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const axios_1 = __importDefault(require("axios"));
const ai_config_1 = require("../config/ai.config");
class AIService {
    static async generateResponse(message) {
        try {
            const response = await axios_1.default.post(ai_config_1.AI_CONFIG.MODEL_URL, { inputs: message }, { headers: ai_config_1.AI_CONFIG.headers });
            return response.data[0].generated_text;
        }
        catch (error) {
            console.error('AI Response Error:', error);
            throw new Error('Failed to generate AI response');
        }
    }
}
exports.AIService = AIService;
