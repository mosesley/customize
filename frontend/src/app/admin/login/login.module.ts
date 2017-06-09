import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginService } from './service/login.service';
import { LoginRoutingModule } from './login-routing.module';
/**
 * Admin Login Module
 * Created by maxu0 on 2017/6/9.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {

}
