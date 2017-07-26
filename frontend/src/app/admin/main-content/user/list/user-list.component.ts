import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialog, MdPaginator, MdSort } from '@angular/material';
import { Store } from '@ngrx/store';
import { AdminUser } from "../../../../common/model/admin-user";
import { CHANGE, NavState } from '../../../../common/reducer/nav-reducer';
import { TableDataSource } from '../../../../common/table/table-data-source';
import { UserAddDialogComponent } from '../add/user-add-dialog.component';
import { MessageDialog } from "../../../../common/dialog/message-dialog";
import { UserEditDialogComponent } from "../edit/user-edit-dialog.component";

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

  userColumns = ['operation', 'username', 'nickname', 'status', 'createDate', 'roles'];
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

  /**
   * 编辑用户
   * @param {AdminUser} user
   */
  openEditDialog(user: AdminUser) {
    let dialogRef = this.dialog.open(UserEditDialogComponent, { data: user});
    dialogRef.afterClosed().subscribe(result => {
      this.dataSource.dataChange = result;
    });
  }

  /**
   * 删除用户
   * @param {string} userId
   */
  deleteUser(userId: string) {
    this.http.delete(`${this.api_user_url}/${userId}/delete`, {
      headers: new HttpHeaders().set('Authorization', `${sessionStorage.getItem("jwtToken")}`)
    }).subscribe(
      () => {
        this.dataSource.dataChange = "deleteUser";
      },
      (error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          // console.log('An error occurred:', error.error.message);
          this.dialog.open(MessageDialog, { data: error.error.message })
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          // console.log(`Backend returned code ${error.status}, body was: ${error.error.message}`);
          this.dialog.open(MessageDialog, { data: error.error.message })
        }
      }
    );
  }
}
