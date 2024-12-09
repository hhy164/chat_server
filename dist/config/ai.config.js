"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AI_CONFIG = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.AI_CONFIG = {
    HUGGING_FACE_API_KEY: process.env.HUGGING_FACE_API_KEY,
    MODEL_URL: "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
    headers: {
        "Authorization": `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json"
    }
};
