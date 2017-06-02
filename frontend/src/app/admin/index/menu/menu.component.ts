import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Menu } from './model/menu';
import { MenuService } from './service/menu.service';
/**
 * Admin left main menu component
 * Created by maxu0 on 2017/6/2.
 */
@Component({
  selector: 'admin-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{
  private menuItems: Observable<Menu[]>;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuItems = this.menuService.getMenus().map(httpRes => {
      console.log(JSON.stringify(httpRes.data));
      return httpRes.data as Menu[];
    });
  }

}
