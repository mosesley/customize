import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { IndexRoutingModule } from './index-routing.module';
import { MenuService } from './menu/service/menu.service';
import { MenuComponent } from './menu/menu.component';
import { MenuItemComponent } from './menu/menu-item/menu-item.component';

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
    IndexComponent,
    MenuComponent,
    MenuItemComponent
  ],
  providers: [
    MenuService
  ]
})
export class IndexModule {

}