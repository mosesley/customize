/**
 * Goods Component
 * @Author 马旭
 * @Date 2017/7/31-10:40
 */
import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
  template: `<router-outlet></router-outlet>`
})
export class GoodsComponent {
  constructor(private pageTitle: Title) {
    this.pageTitle.setTitle(`Admin-Goods`);
  }
}
