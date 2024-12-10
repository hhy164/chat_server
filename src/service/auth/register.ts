import { User } from '../../models/user';
export class RegisterService {
  static async register(username: string, password: string) {
    try {
      // 检查用户是否已存在
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        const error: any = new Error('Username already exists');
        error.code = 400;
        throw error;
      }

      // 创建新用户
      const user = await User.create({
        username,
        password  // 密码会在 model 的 pre save 中自动加密
      });

      return {
        id: user._id,
        username: user.username
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to register user');
    }
  }
}