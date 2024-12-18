import { User, IUser } from '../../models/user';
import jwt from 'jsonwebtoken';
import { LoginPayload, LoginResponse } from './interface';

export class LoginService {
  public async login(payload: LoginPayload): Promise<LoginResponse> {
    const { username, password } = payload;
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
    let token = ''
    try {
      token = jwt.sign(
        {
          userId: user._id.toString(),
          username: user.username
        },
        process.env.JWT_SECRET || '',
        { expiresIn: '24h' }
      );
    } catch (e) {
      console.log(e)
    }


    return {
      token,
      userId: user._id,
      username: user.username
    };
  };
}
