import { User } from '../../models/user';
import request from 'supertest';
import { Server } from '@hapi/hapi';
import { initTestServer } from './testServer';

let server: Server;

export const setupTestServer = async () => {
  server = await initTestServer();
  return server;
};

export const cleanupTestUser = async (username: string) => {
  await User.deleteOne({ username });
};

export const cleanupTestUsers = async (usernames: string[]) => {
  await User.deleteMany({ username: { $in: usernames } });
};

export const setupTestUser = async () => {
  if (!server) {
    server = await initTestServer();
  }

  const testUser = {
    username: 'testuser',
    password: 'Password123'
  };

  const response = await request(server.listener)
    .post('/api/auth/register')
    .send(testUser);

  return {
    ...testUser,
    response
  };
};

export const teardown = async (usernames: string[]) => {
  await cleanupTestUsers(usernames);
  if (server) {
    await server.stop();
  }
}; 