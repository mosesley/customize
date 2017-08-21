/**
 *
 * @Author 马旭
 * @Date 2017/8/15-14:45
 */
import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./index.component";
import { NgModule } from "@angular/core";

const indexRoutes: Routes = [
  {
    path: '',
    component: IndexComponent
  }
];

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
