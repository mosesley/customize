import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';

/**
 * Index routes configuration
 * @type {Array}
 */
const indexRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
  }
];


/**
 * Index Routing Module
 * Created by maxu0 on 2017/6/1.
 */
@NgModule({
  imports: [
    RouterModule.forChild(indexRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class IndexRoutingModule {

}
