import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Menu } from '../menu';
import { rotateAnimation, toggleAnimation } from '../../../common/animation/toggleAnimation';
import { Router } from '@angular/router';
/**
 * Menu item component
 * Created by maxu0 on 2017/6/4.
 */
@Component({
  selector: 'admin-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  animations: [
    toggleAnimation,
    rotateAnimation
  ]
})
export class MenuItemComponent implements OnInit {

  showMenu: boolean; // 是否展开菜单

  @Input()
  menuItem: Menu;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.showMenu = JSON.stringify(this.menuItem).includes(`"path":"${this.router.url}"`);
  }

  // 向外层组件发出鼠标hover事件
  @Output()
  itemHover = new EventEmitter<any>();

  // 收缩和展开菜单
  toggleMenu(): void{
    this.showMenu = !this.showMenu;
  }

  // 鼠标hover
  onHoverItem($event): void {
    this.itemHover.emit($event);
  }

}
