import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './role.component';
import { RoleListComponent } from './list/role-list.component';

/**
 * Role routes configuration
 * @type {Array}
 */
const roleRoutes: Routes = [
  {
    path: '',
    component: RoleComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full'},
      { path: 'list', component: RoleListComponent }
    ]
  }
];


/**
 * Role Routing Module
 * Created by maxu0 on 2017/6/13.
 */
@NgModule({
  imports: [
    RouterModule.forChild(roleRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoleRoutingModule {

}
