import { server } from '@hapi/hapi';
import { routes } from './routes';
import dotenv from 'dotenv';

dotenv.config();

const init = async () => {
  const app = server({
    port: process.env.PORT || 4000,
    host: '127.0.0.1',
    routes: {
      cors: true
    }
  });
  console.log('Registering plugins...');
  // 注册路由插件
  await app.register(routes);
  console.log('Plugins registered');

  await app.start();
  console.log('Server running on %s', app.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init(); 