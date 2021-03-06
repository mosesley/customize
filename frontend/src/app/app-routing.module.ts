import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

/**
 * App root routes configuration
 * @type {Array}
 */
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
  {
    path: 'init',
    loadChildren: 'app/app-init/app-init.module#AppInitModule'
  },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
  },
  {
    path: 'index',
    loadChildren: 'app/index/index.module#IndexModule'
  },
  { path: '**', component: PageNotFoundComponent }
];

/**
 * root route module
 * Created by maxu0 on 2017/5/8.
 */
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
