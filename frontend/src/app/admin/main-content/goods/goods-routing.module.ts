import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GoodsComponent } from "./goods.component";
import { GoodsCategoryComponent } from "./category/goods-category.component";

/**
 * GoodsRoutes configuration
 * @type {[{path: string; component: any; children: [{path: string; component: any}]}]}
 */
const goodsRoutes: Routes = [
  {
    path: '',
    component: GoodsComponent,
    children: [
      { path: 'category/list', component: GoodsCategoryComponent }
    ]
  }
];

/**
 *
 * @Author 马旭
 * @Date 2017/7/30-11:54
 */
@NgModule({
  imports: [
    RouterModule.forChild(goodsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class GoodsRoutingModule {

}
