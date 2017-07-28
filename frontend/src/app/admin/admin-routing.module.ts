import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuard } from './admin-guard.service';

/**
 * Admin routes configuration
 * @type {Array}
 */
const adminRoutes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/admin/login/login.module#LoginModule'
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full'},
      { path: 'index', loadChildren: 'app/admin/main-content/index/index.module#IndexModule'},
      { path: 'user', loadChildren: 'app/admin/main-content/user/user.module#UserModule'},
      { path: 'role', loadChildren: 'app/admin/main-content/role/role.module#RoleModule'},
      { path: 'appConfig', loadChildren: 'app/admin/main-content/appConfig/app-config.module#AppConfigModule'}
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
