import { CdkTableModule } from '@angular/cdk';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdIconModule,
  MdInputModule,
  MdPaginatorModule,
  MdSortModule,
  MdTableModule,
  MdToolbarModule
} from '@angular/material';
import { DialogModule } from '../../../common/dialog/dialog.module';
import { MessageDialog } from '../../../common/dialog/message-dialog';
import { RoleListComponent } from './list/role-list.component';
import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';

/**
 * Admin role module
 * Created by maxu0 on 2017/6/13.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdPaginatorModule,
    MdSortModule,
    MdInputModule,
    MdCardModule,
    DialogModule,
    MdTableModule,
    CdkTableModule,
    MdIconModule,
    MdButtonModule,
    MdToolbarModule,
    FlexLayoutModule,
    MdCheckboxModule,
    RoleRoutingModule
  ],
  declarations: [
    RoleComponent,
    RoleListComponent
  ],
  entryComponents: [
    MessageDialog
  ]
})
export class RoleModule {

}
