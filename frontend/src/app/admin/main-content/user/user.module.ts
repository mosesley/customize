import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './list/user-list.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UserService } from './service/user.service';
import { DialogModule } from '../../../common/dialog/dialog.module';
import { MessageDialog } from '../../../common/dialog/message-dialog';

/**
 * Admin user module
 * Created by maxu0 on 2017/6/13.
 */
@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    DialogModule,
    UserRoutingModule
  ],
  declarations: [
    UserComponent,
    UserListComponent
  ],
  entryComponents: [
    MessageDialog
  ],
  providers: [
    UserService,
    DatePipe
  ]
})
export class UserModule {
  
}
