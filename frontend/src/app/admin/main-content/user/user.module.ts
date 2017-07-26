import { CdkTableModule } from "@angular/cdk";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MdButtonModule, MdCheckboxModule, MdChipsModule,
  MdIconModule,
  MdInputModule,
  MdPaginatorModule,
  MdProgressSpinnerModule, MdRadioModule,
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
import { UserEditDialogComponent } from "./edit/user-edit-dialog.component";
import { UserAuthDialogComponent } from "./auth/user-auth-dialog.component";

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
    MdChipsModule,
    FlexLayoutModule,
    DirectiveModule,
    MdCheckboxModule,
    MdRadioModule,
    UserRoutingModule
  ],
  declarations: [
    UserComponent,
    UserListComponent,
    UserAddDialogComponent,
    UserEditDialogComponent,
    UserAuthDialogComponent
  ],
  entryComponents: [
    MessageDialog,
    UserAddDialogComponent,
    UserEditDialogComponent,
    UserAuthDialogComponent
  ]
})
export class UserModule {

}
