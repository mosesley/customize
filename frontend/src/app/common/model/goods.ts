/**
 * 商品
 * @Author 马旭
 * @Date 2017/8/1-16:47
 */
import { Category } from "./category";

export interface Goods {
  id: string;
  title: string;
  number: string;
  labels: string[];
  price: string;
  des: string;
  showImgUrl: string;
  dzImgUrls: string[];
  category: Category;
}
