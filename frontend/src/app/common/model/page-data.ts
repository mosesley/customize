/**
 * 分页数据接口
 * Created by 马旭 on 2017/7/25-11:00
 */
export interface PageData<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
}
