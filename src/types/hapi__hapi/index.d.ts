declare module '@hapi/hapi' {
  import { Stream } from 'stream';

  export interface ServerRoute {
    method: string | string[];
    path: string;
    options?: RouteOptions;
    handler?: RouteHandler;
  }

  export interface RouteOptions {
    description?: string;
    tags?: string[];
    validate?: {
      payload?: any;
      query?: any;
      params?: any;
      failAction?: (request: Request, h: ResponseToolkit, err: Error) => void;
    };
    handler?: RouteHandler;
  }

  export interface Request {
    payload: any;
    query: any;
    params: any;
  }

  export interface ResponseToolkit {
    response: (data: any) => ResponseObject;
  }

  export interface ResponseObject {
    code: (statusCode: number) => ResponseObject;
    type: (contentType: string) => ResponseObject;
  }

  export type RouteHandler = (
    request: Request,
    h: ResponseToolkit
  ) => Promise<any> | any;

  export interface ServerInfo {
    uri: string;
    protocol: string;
    address: string;
    port: number;
  }

  export interface ServerOptions {
    port: string | number;
    host: string;
    routes?: {
      cors?: boolean | object;
    };
  }

  export interface Plugin<T> {
    name: string;
    register: (server: Server, options?: T) => void | Promise<void>;
  }

  export interface Server {
    route: (route: ServerRoute | ServerRoute[]) => void;
    start: () => Promise<void>;
    register: (plugin: Plugin<any>) => Promise<void>;
    info: ServerInfo;
  }

  export function server(options?: ServerOptions): Server;
} 