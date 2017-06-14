import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
/**
 * Admin User component
 * Created by maxu0 on 2017/6/13.
 */
@Component({
  template: `<router-outlet></router-outlet>`
})
export class UserComponent {

  constructor(private pageTitle: Title) {
    this.pageTitle.setTitle(`${this.pageTitle.getTitle()}-user`);
  }

}