import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoodsComponent } from "./goods.component";
import { GoodsRoutingModule } from "./goods-routing.module";
import {
  MdButtonModule, MdIconModule, MdInputModule, MdPaginatorModule, MdSortModule,
  MdTableModule, MdToolbarModule
} from "@angular/material";
import { DialogModule } from "../../../common/dialog/dialog.module";
import { GoodsCategoryComponent } from "./category/goods-category.component";
import { CdkTableModule } from "@angular/cdk";
import { MessageDialog } from "../../../common/dialog/message-dialog";

/**
 * Goods Module
 * @Author 马旭
 * @Date 2017/7/31-10:37
 */
@NgModule({
  imports: [
    CommonModule,
    MdPaginatorModule,
    MdSortModule,
    MdIconModule,
    MdInputModule,
    MdTableModule,
    CdkTableModule,
    MdButtonModule,
    MdToolbarModule,
    DialogModule,
    GoodsRoutingModule
  ],
  declarations: [
    GoodsComponent,
    GoodsCategoryComponent
  ],
  entryComponents: [
    MessageDialog
  ]
})
export class GoodsModule {

}
