import { Request, Response, NextFunction } from 'express';
import { AppError } from './error.middleware';

export const validateMessage = (req: Request, res: Response, next: NextFunction) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return next(new AppError('Message is required', 400));
  }

  if (message.length > 5000) {
    return next(new AppError('Message is too long (max 5000 characters)', 400));
  }

  next();
}; 