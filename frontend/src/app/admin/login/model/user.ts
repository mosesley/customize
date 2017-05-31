/**
 * Created by maxu0 on 2017/5/31.
 */
export interface User {
  id: number;
  username: string;
  password: string;
  status: boolean;
  createDate: Date;
  admin: boolean;
}
