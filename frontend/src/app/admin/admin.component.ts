import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
/**
 * Admin Component
 * Created by maxu0 on 2017/5/8.
 */
@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(private pageTitle: Title) {
    this.pageTitle.setTitle(`${this.pageTitle.getTitle()}-Admin`);
  }

}
