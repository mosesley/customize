import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdButtonModule, MdCardModule, MdIconModule, MdInputModule } from "@angular/material";
import { AppConfigRoutingModule } from "./app-config-routing.module";
import { AppConfigComponent } from "./app-config.component";
import { DialogModule } from "../../../common/dialog/dialog.module";
import { MessageDialog } from "../../../common/dialog/message-dialog";


/**
 * 系统设置模块
 * @Author 马旭
 * @Date 2017/7/28-10:46
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    FlexLayoutModule,
    MdIconModule,
    MdCardModule,
    MdInputModule,
    MdButtonModule,
    AppConfigRoutingModule
  ],
  declarations: [
    AppConfigComponent
  ],
  entryComponents: [
    MessageDialog
  ]
})
export class AppConfigModule {

}
