import { ServerRoute } from '@hapi/hapi';
import Joi from '@hapi/joi';
import { LoginService } from '../../service/auth/login';
import { ResponseHandler } from '../../utils/response';

// 定义请求参数接口
interface ILoginRequest {
  payload: {
    username: string;
    password: string;
  };
  query?: undefined;
  params?: undefined;
}

// 在路由配置外部定义验证 schema
const loginSchema = Joi.object({
  username: Joi.string().required().min(2).max(30).description('用户名，3-30个字符'),
  password: Joi.string().required().min(6).description('密码，最少6个字符'),
});

export const loginRoute: ServerRoute = {
  method: 'POST',
  path: '/api/auth/login',
  options: {
    description: '用户登录',
    tags: ['api', 'auth'],
    validate: {
      payload: loginSchema,
      failAction: (request, h, err) => {
        throw err;
      },
    },
    handler: async (req: ILoginRequest, h) => {
      const loginService = new LoginService();
      const response = new ResponseHandler();
      try {
        const result = await loginService.login(req.payload);
        return response.success(h, result);
      } catch (error) {
        if (error instanceof Error) {
          return response.error(h, error);
        }
        return response.error(h, '登录失败');
      }
    },
  },
};