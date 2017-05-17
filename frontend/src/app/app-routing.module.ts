import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

/**
 * App routes configuration
 * @type {Array}
 */
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/init',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
  },
  { path: '**', component: PageNotFoundComponent }
];

/**
 * root route module
 * Created by maxu0 on 2017/5/8.
 */
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
