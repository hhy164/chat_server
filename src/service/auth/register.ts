import { User } from '../../models/user';
import { IRegisterPayload } from './interface';
export class RegisterService {
  public async register(payload: IRegisterPayload) {
    const { username, password } = payload
    try {
      // 检查用户是否已存在
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        const error: any = new Error('用户名已存在');
        error.code = 400;
        throw error;
      }

      // 创建新用户
      const user = await User.create({
        username,
        password  // 密码会在 model 的 pre save 中自动加密
      });

      return {
        userId: user._id,
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