import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppInitComponent } from './app-init.component';
import { InitGuard } from './service/init-guard.service';

/**
 * App Init routes configuration
 */
const appInitRoutes: Routes = [
  {
    path: '',
    component: AppInitComponent,
    canActivate: [InitGuard],
  }
];

/**
 * App init route module
 * Created by maxu0 on 2017/5/9.
 */
@NgModule({
  imports: [
    RouterModule.forChild(appInitRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppInitRoutingModule {

}
