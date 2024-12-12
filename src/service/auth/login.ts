import { User, IUser } from '../../models/user';
import jwt from 'jsonwebtoken';
import { LoginPayload } from './interface';

export class LoginService {
  public async login(payload: LoginPayload) {
    const { username, password } = payload;
    try {
      // 显式类型标注
      const user = await User.findOne({ username }) as IUser | null;
      if (!user) {
        const error: any = new Error('用户名或密码错误');
        error.code = 400;
        throw error;
      }

      // 验证密码 (使用 mongoose 模型的方法)
      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        const error: any = new Error('用户名或密码错误');
        error.code = 400;
        throw error;
      }

      // 生成 token
      const token = jwt.sign(
        {
          userId: user._id.toString(),
          username: user.username
        },
        process.env.JWT_SECRET || '',
        { expiresIn: '24h' }
      );

      return {
        token,
        user: {
          id: user._id,
          username: user.username
        }
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        code: 500,
        message: '服务器错误'
      };
    }
  };
}
