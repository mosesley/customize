import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CHANGE, NavState } from '../../../../common/reducer/nav-reducer';
import { MdDialog } from '@angular/material';
import { TableDataSource } from '../../../../common/table/table-data-source';
import { TableDataBase } from '../../../../common/table/table-data-base';
import { HttpClient } from "@angular/common/http";

/**
 * Role list component
 * Created by maxu0 on 2017/6/13.
 */
@Component({
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent {
  roleColumns = ['operation', 'name', 'role'];
  dataBase: TableDataBase<any>;
  dataSource: TableDataSource | null;
  permissions: any[];
  current_role_name: string;
  current_role_id: string;
  current_per_role: string;

  constructor(private http: HttpClient,
              private dialog: MdDialog,
              private store$: Store<NavState>) {
    this.store$.dispatch({type: CHANGE, payload: {title: '角色列表'}});
    this.http.get("/api/admin/role/list").subscribe(datas => {
      this.dataBase = new TableDataBase(JSON.parse(JSON.stringify(datas)));
      this.dataSource = new TableDataSource(this.dataBase);
    });
    this.http.get("/api/admin/permission/list").subscribe(datas => {
      this.permissions = JSON.parse(JSON.stringify(datas));
    });
  }

  // /**
  //  * 添加角色
  //  * @param $event
  //  */
  // createRole(inputName): void {
  //   this.http.addRole({name: inputName.value}).subscribe(
  //     data => {
  //       this.dataBase.addData(data);
  //       inputName.value = "";
  //     },
  //     error => {
  //       this.dialog.open(MessageDialog, {data: error});
  //     }
  //   );
  // }
  //
  // /**
  //  * 删除角色
  //  */
  // deleteRole(id: string): void {
  //   this.roleService.deleteRole(id).subscribe(
  //     () => {
  //       this.dataBase.deleteData(id);
  //     },
  //     error => {
  //       this.dialog.open(MessageDialog, {data: error});
  //     });
  // }
  //
  // /**
  //  * 选择目标角色
  //  * @param {string} id
  //  */
  // changeRoles(id: string, name: string) {
  //   this.current_role_name = name;
  //   this.current_role_id = id;
  //   this.perRoleService.getPerRoles(id).subscribe(data => {
  //     this.current_per_role = JSON.stringify(data);
  //   });
  // }
  //
  // /**
  //  * 改变权限
  //  * @param $event
  //  * @param {string} id
  //  */
  // changeAuth($event, id: string) {
  //   if(id) {
  //     this.roleService.updateRolePermission(id, $event.source.id, $event.checked).subscribe(
  //       data => {
  //
  //       },
  //       error => {
  //         this.dialog.open(MessageDialog, {data: error});
  //     });
  //   }
  // }

  /**
   * 判断是否为选中状态
   * @param {string} permissionId
   */
  isChecked(permissionId: string): boolean {
    if(this.current_per_role) {
      return this.current_per_role.includes(`"permissionId":"${permissionId}"`);
    } else {
      return false;
    }
  }
}
