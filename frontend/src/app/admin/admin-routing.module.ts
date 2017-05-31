import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';

/**
 * Admin routes configuration
 * @type {Array}
 */
const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [],
    children: [
      { path: 'login', component: LoginComponent }
    ]
  }
];

/**
 * Admin route module
 * Created by maxu0 on 2017/5/9.
 */
@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {

}
