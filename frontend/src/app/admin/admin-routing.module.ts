import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuard } from './router-guard/admin-guard.service';

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
      { path: 'index', loadChildren: 'app/admin/index/index.module#IndexModule'}
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
