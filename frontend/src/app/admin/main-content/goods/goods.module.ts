import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoodsComponent } from "./goods.component";
import { GoodsRoutingModule } from "./goods-routing.module";
import {
  MdButtonModule, MdCardModule, MdIconModule, MdInputModule, MdPaginatorModule, MdSortModule,
  MdTableModule, MdToolbarModule
} from "@angular/material";
import { DialogModule } from "../../../common/dialog/dialog.module";
import { CategoryComponent } from "./category/category.component";
import { CdkTableModule } from "@angular/cdk";
import { MessageDialog } from "../../../common/dialog/message-dialog";
import { GoodsListComponent } from "./list/goods-list.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { GoodsAddComponent } from "./add/goods-add.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonComponentModule } from "../../../common/component/common-component.module";

/**
 * Goods Module
 * @Author 马旭
 * @Date 2017/7/31-10:37
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdPaginatorModule,
    MdSortModule,
    MdIconModule,
    MdInputModule,
    MdCardModule,
    MdTableModule,
    CdkTableModule,
    MdButtonModule,
    MdToolbarModule,
    DialogModule,
    CommonComponentModule,
    FlexLayoutModule,
    GoodsRoutingModule
  ],
  declarations: [
    GoodsComponent,
    GoodsListComponent,
    GoodsAddComponent,
    CategoryComponent,
  ],
  entryComponents: [
    MessageDialog,
    GoodsAddComponent
  ]
})
export class GoodsModule {

}
