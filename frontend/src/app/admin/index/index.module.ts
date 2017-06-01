import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { IndexRoutingModule } from './index-routing.module';
/**
 * Admin Index module
 * Created by maxu0 on 2017/6/1.
 */
@NgModule({
  imports: [
    CommonModule,
    IndexRoutingModule
  ],
  declarations: [
    IndexComponent
  ],
  providers: []
})
export class IndexModule {

}