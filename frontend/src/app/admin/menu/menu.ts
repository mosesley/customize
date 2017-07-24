/**
 * Menu interface
 * Created by maxu0 on 2017/6/2.
 */
export interface Menu {
  id: number;
  path: string;
  name: string;
  icon?: string;
  orderNum?: number;
  subMenu?: Menu[];
}
