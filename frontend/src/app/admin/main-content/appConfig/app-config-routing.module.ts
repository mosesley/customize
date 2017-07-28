import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppConfigComponent } from "./app-config.component";

/**
 * App Config routes configuration
 * @type {Array}
 */
const appConfigRoutes: Routes = [
  {
    path: '',
    component: AppConfigComponent,
  }
];

/**
 *
 * @Author 马旭
 * @Date 2017/7/28-10:51
 */
@NgModule({
  imports: [
    RouterModule.forChild(appConfigRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppConfigRoutingModule {

}
