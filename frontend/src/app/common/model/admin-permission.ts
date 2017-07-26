import { Observable } from "rxjs/Observable";
/**
 * Admin Permission interface
 * @Author 马旭
 * @Date 2017/7/25-14:21
 */
export interface AdminPermission {
  id: string;
  name: string;
  url: string;
  method: string;
  subPer?: AdminPermission[];
  checked?: Observable<boolean>;
}
