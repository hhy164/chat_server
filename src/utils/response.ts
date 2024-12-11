import { ResponseToolkit, ResponseObject } from '@hapi/hapi';

interface IResponseData {
  code: number;
  message?: string;
  data?: any;
}

export class ResponseHandler {
  public success(h: ResponseToolkit, data?: any, message?: string, code: number = 200): ResponseObject {
    const response: IResponseData = {
      code,
      message,
      data
    };

    return h.response(response).code(code);
  }

  public error(h: ResponseToolkit, error: any): ResponseObject {
    const code = error.code || 500;
    const response: IResponseData = {
      code,
      message: error.message || 'Internal server error'
    };

    return h.response(response).code(code);
  }
}