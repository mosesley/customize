import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Menu } from '../model/menu';
import { toggleAnimation } from '../../../common/animation/toggleAnimation';
/**
 * Menu item component
 * Created by maxu0 on 2017/6/4.
 */
@Component({
  selector: 'admin-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  animations: [
    toggleAnimation
  ]
})
export class MenuItemComponent {
  showMenu: boolean = false; // 是否展开菜单

  @Input()
  menuItem: Menu;

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
