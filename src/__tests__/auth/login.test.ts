import dotenv from 'dotenv';
dotenv.config();
import { server } from '@hapi/hapi';
import { routes } from '../../routes';
import { User } from '../../models/user';
import * as bcrypt from 'bcrypt';
import { connectDB } from '../../db';

describe('登录接口测试', () => {
  let testServer: any;
  const testUser = {
    username: 'testuser',
    password: 'Password123'
  };

  beforeAll(async () => {
    // 连接数据库
    await connectDB();

    // 创建测试服务器
    testServer = server({
      port: 0,
      host: 'localhost'
    });

    // 注册路由
    await testServer.register(routes);
    await testServer.start();

    // 创建测试用户
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(testUser.password, salt);

    await User.create({
      username: testUser.username,
      password: hashedPassword
    });
  });

  afterAll(async () => {
    // 清理测试用户
    await User.deleteOne({ username: testUser.username });
    await testServer.stop();
  });

  it('使用正确的用户名和密码应该成功登录', async () => {
    const response = await testServer.inject({
      method: 'POST',
      url: '/api/auth/login',
      payload: {
        username: testUser.username,
        password: testUser.password
      }
    });

    expect(response.statusCode).toBe(200);
    expect(response.result).toEqual(
      expect.objectContaining({
        code: 200,
        message: '登录成功',
        data: expect.objectContaining({
          token: expect.any(String),
          username: testUser.username
        })
      })
    );
  });

  it('使用错误的密码应该返回400错误', async () => {
    const response = await testServer.inject({
      method: 'POST',
      url: '/api/auth/login',
      payload: {
        username: testUser.username,
        password: 'wrongpassword'
      }
    });

    expect(response.statusCode).toBe(400);
    expect(response.result).toEqual({
      code: 400,
      message: '用户名或密码错误'
    });
  });

  it('使用不存在的用户名应该返回400错误', async () => {
    const response = await testServer.inject({
      method: 'POST',
      url: '/api/auth/login',
      payload: {
        username: 'nonexistentuser',
        password: 'anypassword'
      }
    });

    expect(response.statusCode).toBe(400);
    expect(response.result).toEqual({
      code: 400,
      message: '用户名或密码错误'
    });
  });

  it('请求参数不完整应该返回400错误', async () => {
    const response = await testServer.inject({
      method: 'POST',
      url: '/api/auth/login',
      payload: {
        username: testUser.username
        // 缺少 password
      }
    });

    expect(response.statusCode).toBe(400);
  });
}); 