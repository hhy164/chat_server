import { Request, ResponseToolkit } from '@hapi/hapi';
import { config } from '../config';
import jwt from 'jsonwebtoken';

export const validateToken = async (request: Request, h: ResponseToolkit) => {
  const token = request.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return h.response({
      code: 401,
      message: 'No token provided'
    }).code(401);
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    request.auth.credentials = decoded;
    return h.continue;
  } catch (error) {
    return h.response({
      code: 401,
      message: 'Invalid token'
    }).code(401);
  }
}; 