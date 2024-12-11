import { Plugin, Server } from '@hapi/hapi';
import { authRoutes } from './auth';

export const routes: Plugin<void> = {
  name: 'app-routes',
  register: async (server: Server) => {
    server.route([
      ...authRoutes
    ]);
  }
}; 