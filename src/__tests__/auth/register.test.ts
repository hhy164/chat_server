import request from 'supertest';
import { Server } from '@hapi/hapi';
import { User } from '../../models/user';
import { initTestServer } from '../utils/testServer';

describe('注册接口 POST /api/auth/register', () => {
  let server: Server;
  const testUsernames = ['testuser', 'existinguser', 'testuser2'];

  beforeAll(async () => {
    server = await initTestServer();
  });

  afterEach(async () => {
    // 每个测试后删除本次测试创建的用户
    await User.deleteMany({ username: { $in: testUsernames } });
  });

  afterAll(async () => {
    await server.stop();
  });

  it('应该成功注册新用户', async () => {
    const response = await request(server.listener)
      .post('/api/auth/register')
      .send({
        username: testUsernames[0],
        password: 'Password123'
      });

    expect(response.status).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe('注册成功');
    expect(response.body.data).toHaveProperty('userId');
    expect(response.body.data.username).toBe(testUsernames[0]);
  });

  it('当用户名已存在时应该返回错误', async () => {
    // 先创建一个用户
    await request(server.listener)
      .post('/api/auth/register')
      .send({
        username: testUsernames[1],
        password: 'Password123'
      });

    // 尝试创建同名用户
    const response = await request(server.listener)
      .post('/api/auth/register')
      .send({
        username: testUsernames[1],
        password: 'Password123'
      });

    expect(response.status).toBe(400);
    expect(response.body.code).toBe(400);
    expect(response.body.message).toContain('用户名已存在');
  });

  it('当密码格式不正确时应该返回错误', async () => {
    const response = await request(server.listener)
      .post('/api/auth/register')
      .send({
        username: testUsernames[2],
        password: '123' // 密码太短且不包含字母
      });

    expect(response.status).toBe(400);
    expect(response.body.code).toBe(400);
    expect(response.body.message).toContain('密码格式不正确');
  });
}); 