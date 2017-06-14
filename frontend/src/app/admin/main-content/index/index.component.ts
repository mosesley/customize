import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
/**
 * Created by maxu0 on 2017/6/1.
 */
@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  constructor(private pageTitle: Title) {
    this.pageTitle.setTitle(`Admin-index`);
  }

}