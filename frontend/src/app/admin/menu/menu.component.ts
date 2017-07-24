import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Menu } from './menu';
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
  private menu_api_url = "/api/admin/menus";
  private menuItems: Observable<Menu[]>;
  public hoverElemHeight: number;
  public hoverElemTop: number;
  public outOfArea: number = -200;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log("menu init");
    this.menuItems = this.http.get<Menu[]>(this.menu_api_url,
      { headers: new HttpHeaders().set('Authorization', `${sessionStorage.getItem("jwtToken")}`)});
  }

  public hoverItem($event): void {
    this.hoverElemHeight = $event.currentTarget.clientHeight;
    this.hoverElemTop = $event.currentTarget.getBoundingClientRect().top;
  }

}
