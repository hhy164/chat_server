import { ServerRoute } from '@hapi/hapi';
import { registerRoute } from './register';
import { loginRoute } from './login';

export const authRoutes: ServerRoute[] = [
  registerRoute,
  loginRoute
];