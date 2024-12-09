import dotenv from 'dotenv';
dotenv.config();

export const AI_CONFIG = {
  HUGGING_FACE_API_KEY: process.env.HUGGING_FACE_API_KEY,
  MODEL_URL: "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
  headers: {
    "Authorization": `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
    "Content-Type": "application/json"
  }
} 