import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './list/user-list.component';

/**
 * Admin user module
 * Created by maxu0 on 2017/6/13.
 */
@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  declarations: [
    UserComponent,
    UserListComponent
  ],
  providers: [

  ]
})
export class UserModule {
  
}
