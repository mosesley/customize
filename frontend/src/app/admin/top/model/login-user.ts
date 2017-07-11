/**
 * Admin Login User Model interface
 */
export class LoginUser {
  id: string;
  username: string;
  nickname: string;
  password: string;
  status: boolean;
  createDate: string;
  token: string;
}