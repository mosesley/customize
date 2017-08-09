import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GoodsComponent } from "./goods.component";
import { CategoryComponent } from "./category/category.component";
import { GoodsListComponent } from "./list/goods-list.component";
import { GoodsAddComponent } from "./add/goods-add.component";

/**
 * GoodsRoutes configuration
 * @type {[{path: string; component: any; children: [{path: string; component: any}]}]}
 */
const goodsRoutes: Routes = [
  {
    path: '',
    component: GoodsComponent,
    children: [
      { path: 'list', component: GoodsListComponent },
      { path: 'add', component: GoodsAddComponent },
      { path: 'category/list', component: CategoryComponent }
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
