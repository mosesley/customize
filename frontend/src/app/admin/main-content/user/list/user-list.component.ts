import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { CHANGE, NavState } from '../../../../common/reducer/nav-reducer';
import { MdDialog, MdPaginator, MdSort } from '@angular/material';
import { ExampleDataSource } from '../../../../common/table/example-data-source';
import { ExampleHttpService } from '../../../../common/table/example-http-service';
import { User } from '../user';
import { Http } from '@angular/http';
import { HttpUtil } from '../../../../common/utils/http-util';
import { UserAddDialogComponent } from '../add/user-add-dialog.component';

/**
 * User list component
 * Created by maxu0 on 2017/6/13.
 */
@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit{
  private user_api_url = "/api/admin/user";

  userColumns = ['username', 'nickname', 'status', 'createDate'];
  database: ExampleHttpService | null;
  dataSource: ExampleDataSource<User> | null;

  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild(MdSort) sort: MdSort;

  constructor(private store$: Store<NavState>, private dialog: MdDialog, private http: Http) {
    this.store$.dispatch({type: CHANGE, payload: {title: '用户列表'}});
    this.database = new ExampleHttpService(http, this.user_api_url, HttpUtil.httpOptionsWithToken);
  }

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = "每页数据条数";
    this.dataSource = new ExampleDataSource<User>(this.database, this.sort, this.paginator);
  }

  /**
   * 添加用户
   */
  openAddUserDialog() {
    let dialogRef = this.dialog.open(UserAddDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.dataSource.dataChange = result;
    });
  }
}
