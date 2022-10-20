// 权限问题后期增加
import { get, post } from '../../utils/http/axios';
enum URL {
  loginQrKey = '/login/qr/key',
  loginStatus = '/login/status',
  loginQr = '/login/qr/create',
  loginCheck = '/login/qr/check',
  account = '/user/account',
}
interface LoginRes {
  token: string;
}

export interface LoginData {
  username: string;
  password: string;
}

const getUserAccount = async (params: any) => get<any>({ url: URL.account, params });
const loginQr = async (params: any) => get<any>({ url: URL.loginQr, params });
const loginStatus = async (data: any) => post<any>({ url: URL.loginStatus + `?timestamp=${Date.now()}`, data });
const loginQrKey = async (params: any) => get<any>({ url: URL.loginQrKey, params });
const loginCheck = async (params: any) => get<any>({ url: URL.loginCheck, params });
export { getUserAccount, loginQrKey, loginQr, loginCheck, loginStatus };
