import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { CHANGE, NavState } from '../../../../common/reducer/nav-reducer';
import { MdDialog, MdPaginator, MdSort } from '@angular/material';
import { TableDataSource } from '../../../../common/table/table-data-source';
import { UserAddDialogComponent } from '../add/user-add-dialog.component';
import { HttpClient } from "@angular/common/http";
import { AdminUser } from "../../../../common/model/admin-user";

/**
 * User list component
 * Created by maxu0 on 2017/6/13.
 */
@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  private api_user_url = "/api/admin/user";

  userColumns = ['username', 'nickname', 'status', 'createDate'];
  dataSource: TableDataSource<AdminUser> | null;

  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild(MdSort) sort: MdSort;

  constructor(private store$: Store<NavState>, private dialog: MdDialog, private http: HttpClient) {
    this.store$.dispatch({type: CHANGE, payload: {title: '用户列表'}});
  }

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = "每页数据条数";
    this.dataSource = new TableDataSource<AdminUser>(this.api_user_url, this.http, this.sort, this.paginator);
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
