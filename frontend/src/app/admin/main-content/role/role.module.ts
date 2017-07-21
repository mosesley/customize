import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import { RoleListComponent } from './list/role-list.component';
import { RoleService } from './service/role.service';
import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdIconModule,
  MdInputModule,
  MdTableModule,
  MdToolbarModule
} from '@angular/material';
import { DialogModule } from '../../../common/dialog/dialog.module';
import { MessageDialog } from '../../../common/dialog/message-dialog';
import { CdkTableModule } from '@angular/cdk';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PermissionService } from './service/permission.service';
import { PerRoleService } from './service/per-role.service';

/**
 * Admin role module
 * Created by maxu0 on 2017/6/13.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
  ],
  providers: [
    RoleService,
    PermissionService,
    PerRoleService
  ]
})
export class RoleModule {

}
