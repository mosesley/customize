import { CdkTableModule } from "@angular/cdk";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MdButtonModule,
  MdIconModule,
  MdInputModule,
  MdPaginatorModule,
  MdProgressSpinnerModule,
  MdSortModule,
  MdTableModule,
  MdToolbarModule
} from "@angular/material";
import { DialogModule } from "../../../common/dialog/dialog.module";
import { MessageDialog } from "../../../common/dialog/message-dialog";
import { DirectiveModule } from "../../../common/directive/directive.module";
import { UserAddDialogComponent } from "./add/user-add-dialog.component";
import { UserListComponent } from "./list/user-list.component";
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";

/**
 * Admin user module
 * Created by maxu0 on 2017/6/13.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    MdTableModule,
    CdkTableModule,
    MdProgressSpinnerModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    MdPaginatorModule,
    MdSortModule,
    FlexLayoutModule,
    DirectiveModule,
    UserRoutingModule
  ],
  declarations: [
    UserComponent,
    UserListComponent,
    UserAddDialogComponent
  ],
  entryComponents: [
    MessageDialog,
    UserAddDialogComponent
  ]
})
export class UserModule {

}
