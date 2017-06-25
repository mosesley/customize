import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { MdButtonModule, MdCardModule, MdIconModule, MdInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

/**
 * Admin Login Module
 * Created by maxu0 on 2017/6/9.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdButtonModule,
    FlexLayoutModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {

}
