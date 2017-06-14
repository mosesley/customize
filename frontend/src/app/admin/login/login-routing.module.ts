import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

/**
 * Login routes configuration
 * @type {Array}
 */
const loginRoutes: Routes = [
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
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule {

}
