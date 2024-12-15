import { Server } from '@hapi/hapi';
import { User } from '../../models/user';
import { initTestServer } from '../utils/testServer';

describe('登录接口 POST /api/auth/login', () => {
  let server: Server;
  const testUsername = 'logintest';

  beforeAll(async () => {
    server = await initTestServer();

    // 创建测试用户
    await server.inject({
      method: 'POST',
      url: '/api/auth/register',
      payload: {
        username: testUsername,
        password: 'Password123'
      }
    });
  });

  afterAll(async () => {
    // 只删除测试用户
    await User.deleteOne({ username: testUsername });
    await server.stop();
  });

  it('应该成功登录并返回token', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/auth/login',
      payload: {
        username: testUsername,
        password: 'Password123'
      }
    });

    console.log('Login Response:', response.result);

    expect(response.statusCode).toBe(200);
    expect(response.result).toHaveProperty('code', 200);
    expect(response.result).toHaveProperty('message', '登录成功');
    expect(response.result.data).toHaveProperty('token');
    expect(response.result.data).toHaveProperty('userId');
    expect(response.result.data.username).toBe(testUsername);
  });

  it('当用户名不存在时应该返回错误', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/auth/login',
      payload: {
        username: 'nonexistentuser',
        password: 'Password123'
      }
    });

    expect(response.statusCode).toBe(400);
    expect(response.result).toHaveProperty('code', 400);
    expect(response.result).toHaveProperty('message');
    expect(response.result.message).toContain('用户名或密码错误');
  });

  it('当密码错误时应该返回错误', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/auth/login',
      payload: {
        username: testUsername,
        password: 'WrongPassword123'
      }
    });

    expect(response.statusCode).toBe(400);
    expect(response.result).toHaveProperty('code', 400);
    expect(response.result).toHaveProperty('message');
    expect(response.result.message).toContain('用户名或密码错误');
  });

  it('当请求参数不完整时应该返回错误', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/auth/login',
      payload: {
        username: testUsername
        // 缺少 password
      }
    });

    expect(response.statusCode).toBe(400);
    expect(response.result).toHaveProperty('code', 400);
    expect(response.result).toHaveProperty('message');
    expect(response.result.message).toContain('参数错误');
  });
}); 