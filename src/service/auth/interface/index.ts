export interface IRegisterPayload {
  username: string;
  password: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginSuccess {
  token: string;
  userId: string;
  username: string;
}

export interface LoginError {
  code: number;
  message: string;
}

export type LoginResponse = LoginSuccess | LoginError;