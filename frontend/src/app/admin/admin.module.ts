import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminGuard } from './router-guard/admin-guard.service';
import { MenuComponent } from './menu/menu.component';
import { AdminPageTop } from './top/admin-page-top.component';
import { MenuService } from './menu/service/menu.service';
import { MenuItemComponent } from './menu/menu-item/menu-item.component';
import { LoginService } from './login/service/login.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MdButtonModule, MdIconModule, MdInputModule, MdMenuModule, MdSidenavModule,
  MdToolbarModule
} from '@angular/material';

/**
 * Admin Module
 * Created by maxu0 on 2017/5/8.
 */
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MdSidenavModule,
    MdToolbarModule,
    MdButtonModule,
    MdInputModule,
    MdIconModule,
    MdMenuModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    MenuComponent,
    MenuItemComponent,
    AdminPageTop
  ],
  providers: [
    MenuService,
    LoginService,
    AdminGuard
  ]
})
export class AdminModule {

}
