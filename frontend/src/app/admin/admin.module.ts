import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminGuard } from './admin-guard.service';
import { MenuComponent } from './menu/menu.component';
import { AdminPageTop } from './top/admin-page-top.component';
import { MenuItemComponent } from './menu/menu-item/menu-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MdButtonModule,
  MdIconModule,
  MdInputModule,
  MdMenuModule,
  MdSidenavModule,
  MdToolbarModule
} from '@angular/material';
import { appNameReducer, navReducer } from '../common/reducer/nav-reducer';
import { StoreModule } from '@ngrx/store';

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
    StoreModule.provideStore({navReducer: navReducer, appNameReducer: appNameReducer}),
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    MenuComponent,
    MenuItemComponent,
    AdminPageTop
  ],
  providers: [
    AdminGuard
  ]
})
export class AdminModule {

}
