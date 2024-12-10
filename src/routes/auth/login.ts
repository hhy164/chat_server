import { ServerRoute } from '@hapi/hapi';
import Joi from '@hapi/joi';

export const loginRoute: ServerRoute = {
  method: 'POST',
  path: '/api/auth/login',
  handler: async (request, h) => {
    // 登录逻辑
    return { message: 'login route' };
  }
};