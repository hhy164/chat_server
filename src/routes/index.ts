import { Plugin, Server } from '@hapi/hapi';
import { authRoutes } from './auth';
import { conversationRoutes } from './conversation';

export const routes: Plugin<void> = {
  name: 'app-routes',
  register: async (server: Server) => {
    // 注册认证插件
    await server.register(require('@hapi/jwt'));

    // 配置路由
    server.route([
      ...authRoutes,
      ...conversationRoutes
    ]);
  }
}; 