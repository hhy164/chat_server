import Hapi from '@hapi/hapi';
import { config } from './config/index';
import { db } from './db/index';
import { routes } from './routes/index';
import { validateToken } from './middlewares/auth.middleware';

const init = async () => {
  const server = Hapi.server({
    port: config.port,
    host: 'localhost',
    routes: {
      cors: true,
      auth: {
        strategy: 'jwt',
        mode: 'optional'
      }
    }
  });

  // 注册路由插件
  await server.register(routes);

  // 配置认证策略
  server.auth.strategy('jwt', 'jwt', {
    key: config.jwtSecret,
    validate: validateToken
  });

  // 连接数据库
  await db.connect();

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init(); 