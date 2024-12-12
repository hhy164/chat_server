import { server } from '@hapi/hapi';
import { routes } from '../../routes';
import { connectDB } from '../../db';
import dotenv from 'dotenv';

dotenv.config();

export const initTestServer = async () => {
  // 连接测试数据库
  connectDB();

  const app = server({
    port: process.env.PORT || 3000,
    host: '127.0.0.1',
    routes: {
      cors: true
    }
  });

  console.log('Registering plugins for test server...');
  // 注册路由插件
  await app.register(routes);
  console.log('Plugins registered for test server');

  await app.start();
  console.log('Test server running on %s', app.info.uri);

  return app;
};

// 错误处理
process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
}); 