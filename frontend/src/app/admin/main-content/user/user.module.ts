import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './list/user-list.component';
import { DialogModule } from '../../../common/dialog/dialog.module';
import { MessageDialog } from '../../../common/dialog/message-dialog';
import {
  MdButtonModule,
  MdIconModule,
  MdInputModule,
  MdPaginatorModule,
  MdProgressSpinnerModule,
  MdSortModule,
  MdTableModule,
  MdToolbarModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk';
import { UserAddDialogComponent } from './add/user-add-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EqualValidatorDirective } from '../../../common/directive/equal-validator.directive';

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
    UserRoutingModule
  ],
  declarations: [
    UserComponent,
    UserListComponent,
    UserAddDialogComponent,
    EqualValidatorDirective
  ],
  entryComponents: [
    MessageDialog,
    UserAddDialogComponent
  ]
})
export class UserModule {

}
