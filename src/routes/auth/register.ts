import { ServerRoute } from '@hapi/hapi';
import Joi from '@hapi/joi';

export const registerRoute: ServerRoute = {
  method: 'POST',
  path: '/api/auth/register',
  handler: async (request, h) => {
    // 注册逻辑
    return { message: 'register route' };
  }
};