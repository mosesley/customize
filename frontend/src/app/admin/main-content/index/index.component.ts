import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { NAV_CHANGE, NavState } from '../../../common/reducer/nav-reducer';

/**
 * Home page,现在主要用来测试一些组件
 * Created by maxu0 on 2017/6/1.
 */
@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  constructor(private pageTitle: Title, private store$: Store<NavState>) {
    this.store$.dispatch({type: NAV_CHANGE, payload: {title: '主页'}});
    this.pageTitle.setTitle(`Admin-index`);
  }
}
