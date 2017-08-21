/**
 * 前台根模块
 * @Author 马旭
 * @Date 2017/8/15-14:39
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IndexComponent } from "app/index/index.component";
import { IndexRoutingModule } from "./index-routing.module";


@NgModule({
  imports: [
    CommonModule,
    IndexRoutingModule
  ],
  declarations: [
    IndexComponent
  ]
})
export class IndexModule {

}

