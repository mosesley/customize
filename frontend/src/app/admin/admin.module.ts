import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/service/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/**
 * Admin Module
 * Created by maxu0 on 2017/5/8.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    LoginComponent
  ],
  providers: [
    LoginService
  ]
})
export class AdminModule {

}
