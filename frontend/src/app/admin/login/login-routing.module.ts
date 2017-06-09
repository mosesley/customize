import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

/**
 * Admin routes configuration
 * @type {Array}
 */
const adminRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];


/**
 * Login routes Module
 * Created by maxu0 on 2017/6/9.
 */
@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule {

}
