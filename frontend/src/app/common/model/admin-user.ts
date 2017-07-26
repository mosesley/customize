import { AdminRole } from "./admin-role";
/**
 * Admin User interface
 */
export interface AdminUser {
  id: string;
  username: string;
  nickname: string;
  status: boolean;
  admin: boolean;
  createDate: string;
  roles: AdminRole[];
}
