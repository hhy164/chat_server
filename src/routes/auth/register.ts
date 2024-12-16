import { ServerRoute } from '@hapi/hapi';
import Joi from '@hapi/joi';
import { RegisterService } from '../../service/auth/register';
import { ResponseHandler } from '../../utils/response';

// 定义请求参数接口
interface IRegisterRequest {
  payload: {
    username: string;
    password: string;
  };
  query?: undefined;
  params?: undefined;
}

// 在路由配置外部定义验证 schema
const registerSchema = Joi.object({
  username: Joi.string().required().min(2).max(30).description('用户名，3-30个字符'),
  password: Joi.string().required().min(6).description('密码，最少6个字符'),
});


export const registerRoute: ServerRoute = {
  method: 'POST',
  path: '/api/auth/register',
  options: {
    description: '用户注册',
    tags: ['api', 'auth'],
    validate: {
      payload: registerSchema,
      failAction: (request, h, err) => {
        throw err;
      },
    },
    handler: async (req: IRegisterRequest, h) => {
      const registerService = new RegisterService();
      const response = new ResponseHandler();
      try {
        const result = await registerService.register(req.payload);
        return response.success(h, result, '注册成功');
      } catch (error) {
        if (error instanceof Error) {
          return response.error(h, error);
        }
        return response.error(h, {
          code: 500,
          message: "注册失败"
        });
      }
    },
  },
};