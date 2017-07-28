import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialog, MdPaginator, MdSort } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import { MessageDialog } from "../../../../common/dialog/message-dialog";
import { AdminPerRole } from "../../../../common/model/admin-per-role";
import { AdminPermission } from "../../../../common/model/admin-permission";
import { AdminRole } from "../../../../common/model/admin-role";
import { NAVCHANGE, NavState } from '../../../../common/reducer/nav-reducer';
import { TableDataSource } from '../../../../common/table/table-data-source';
import "rxjs/add/operator/map";

/**
 * Role list component
 * Created by maxu0 on 2017/6/13.
 */
@Component({
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
  private api_role_url = "/api/admin/role";
  private api_permission_url = "/api/admin/permission/list";
  private api_per_role_url = "/api/admin/per_role";

  roleColumns = ['operation', 'name', 'role'];
  dataSource: TableDataSource<AdminRole> | null;
  permissions: AdminPermission[];
  current_role: AdminRole;

  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild(MdSort) sort: MdSort;

  constructor(private http: HttpClient,
              private dialog: MdDialog,
              private store$: Store<NavState>) {
    this.store$.dispatch({type: NAVCHANGE, payload: {title: '角色列表'}});
  }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = "每页数据条数";
    this.dataSource = new TableDataSource<AdminRole>(this.api_role_url, this.http, this.sort, this.paginator);
    this.http.get<AdminPermission[]>(this.api_permission_url, {
      headers: new HttpHeaders().set('Authorization', `${sessionStorage.getItem("jwtToken")}`)
    }).subscribe(data => {
      this.permissions = data;
    });
  }

  /**
   * 添加角色
   * @param inputName
   */
  createRole(inputName): void {
    this.http.post<AdminRole>(`${this.api_role_url}/add`, {name: inputName.value}, {
      headers: new HttpHeaders().set('Authorization', `${sessionStorage.getItem("jwtToken")}`)
    }).subscribe(
      data => {
        this.dataSource.dataChange = "addRole";
        inputName.value = "";
      },
      (error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          // console.log('An error occurred:', error.error.message);
          this.dialog.open(MessageDialog, {data: error.error.message});
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          // console.log(`Backend returned code ${error.status}, body was: ${error.error.message}`);
          this.dialog.open(MessageDialog, {data: error.error.message});
        }
      }
    );
  }


  /**
   * 删除角色
   */
  deleteRole(id: string): void {
    this.http.delete(`${this.api_role_url}/${id}/delete`, {
      headers: new HttpHeaders().set('Authorization', `${sessionStorage.getItem("jwtToken")}`)
    }).subscribe(
      (data) => {
        this.dataSource.dataChange = "deleteRole";
      },
      (error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          // console.log('An error occurred:', error.error.message);
          this.dialog.open(MessageDialog, {data: error.error.message});
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          // console.log(`Backend returned code ${error.status}, body was: ${error.error.message}`);
          this.dialog.open(MessageDialog, {data: error.error.message});
        }
      });
  }

  /**
   * 选择目标角色
   * @param {string} id
   */
  changeCurrentRoles(role: AdminRole) {
    this.current_role = role;
    for (let permission of this.permissions) {
      permission.checked = this.isChecked(permission.id, role.id);
      for (let subPer of permission.subPer) {
        subPer.checked = this.isChecked(subPer.id, role.id);
      }
    }
  }

  /**
   * 改变权限
   * @param $event
   * @param {string} id
   */
  changeAuth($event, roleId: string) {
    this.http.get(`${this.api_role_url}/updatePermission`, {
      headers: new HttpHeaders().set('Authorization', `${sessionStorage.getItem("jwtToken")}`),
      params: new HttpParams()
        .append("permissionId", $event.source.id)
        .append("roleId", roleId)
        .append("checked", $event.checked)
    }).subscribe(
      (data) => {
        // nothing
      },
      (error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          // console.log('An error occurred:', error.error.message);
          this.dialog.open(MessageDialog, {data: error.error.message});
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          // console.log(`Backend returned code ${error.status}, body was: ${error.error.message}`);
          this.dialog.open(MessageDialog, {data: error.error.message});
        }
      });
  }

  /**
   * 判断是否为选中状态
   * @param {string} permissionId
   */
  private isChecked(permissionId: string, roleId: string): Observable<boolean> {
    return this.http.get<AdminPerRole>(this.api_per_role_url, {
      headers: new HttpHeaders().set('Authorization', `${sessionStorage.getItem("jwtToken")}`),
      params: new HttpParams()
        .append("permissionId", permissionId)
        .append("roleId", roleId)
    }).map(
      (data) => {
        if (data) {
          return true;
        } else {
          return false;
        }
      },
      (error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          // console.log('An error occurred:', error.error.message);
          this.dialog.open(MessageDialog, {data: error.error.message});
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          // console.log(`Backend returned code ${error.status}, body was: ${error.error.message}`);
          this.dialog.open(MessageDialog, {data: error.error.message});
        }
      });
  }

}
