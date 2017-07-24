import { Component } from '@angular/core';
import { NavState } from '../common/reducer/nav-reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

/**
 * Admin Component
 * Created by maxu0 on 2017/5/8.
 */
@Component({
  // templateUrl: './admin.component.html',
  template: 'admin module',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  navState$: Observable<NavState>;

  constructor(private store$: Store<NavState>) {
    this.navState$ = this.store$.select('navReducer');
  }
}
