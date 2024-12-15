import { server } from '@hapi/hapi';
import { routes } from '../../routes';
import { User } from '../../models/user';
import { connectDB } from '../../db';

describe('注册接口测试', () => {
  let testServer: any;

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
  });

  afterEach(async () => {
    // 每个测试后清理创建的测试用户
    await User.deleteMany({
      username: {
        $in: ['testuser', 'existinguser']
      }
    });
  });

  afterAll(async () => {
    await testServer.stop();
  });

  it('使用有效的用户名和密码应该成功注册', async () => {
    const response = await testServer.inject({
      method: 'POST',
      url: '/api/auth/register',
      payload: {
        username: 'testuser',
        password: 'Password123'
      }
    });

    expect(response.statusCode).toBe(200);
    expect(response.result).toEqual(
      expect.objectContaining({
        code: 200,
        message: '注册成功',
        data: expect.objectContaining({
          userId: expect.any(String),
          username: 'testuser'
        })
      })
    );

    // 验证用户是否真的被创建到数据库
    const user = await User.findOne({ username: 'testuser' });
    expect(user).toBeTruthy();
    expect(user?.username).toBe('testuser');
  });

  it('当用户名已存在时应该返回错误', async () => {
    // 先创建一个用户
    await testServer.inject({
      method: 'POST',
      url: '/api/auth/register',
      payload: {
        username: 'existinguser',
        password: 'Password123'
      }
    });

    // 尝试创建同名用户
    const response = await testServer.inject({
      method: 'POST',
      url: '/api/auth/register',
      payload: {
        username: 'existinguser',
        password: 'Password123'
      }
    });

    expect(response.statusCode).toBe(400);
    expect(response.result).toEqual({
      code: 400,
      message: '用户名已存在'
    });
  });

  it('当密码格式不正确时应该返回错误', async () => {
    const response = await testServer.inject({
      method: 'POST',
      url: '/api/auth/register',
      payload: {
        username: 'testuser',
        password: '123' // 密码太短且不包含字母
      }
    });

    expect(response.statusCode).toBe(400);
    expect(response.result).toEqual({
      code: 400,
      message: '密码格式不正确'
    });
  });

  it('当请求参数不完整时应该返回错误', async () => {
    const response = await testServer.inject({
      method: 'POST',
      url: '/api/auth/register',
      payload: {
        username: 'testuser'
        // 缺少 password
      }
    });

    expect(response.statusCode).toBe(400);
    expect(response.result).toEqual({
      code: 400,
      message: '参数错误'
    });
  });

  it('当用户名格式不正确时应该返回错误', async () => {
    const response = await testServer.inject({
      method: 'POST',
      url: '/api/auth/register',
      payload: {
        username: 'a', // 用户名太短
        password: 'Password123'
      }
    });

    expect(response.statusCode).toBe(400);
    expect(response.result).toEqual({
      code: 400,
      message: '用户名格式不正确'
    });
  });
}); 