import { Component } from '@angular/core';
import { RoleService } from '../service/role.service';
import { Store } from '@ngrx/store';
import { CHANGE, NavState } from '../../../../common/reducer/nav-reducer';
import { MdDialog } from '@angular/material';
import { TableDataSource } from '../../../../common/table/table-data-source';
import { MessageDialog } from '../../../../common/dialog/message-dialog';
import { TableDataBase } from '../../../../common/table/table-data-base';
import { PermissionService } from '../service/permission.service';
import { PerRoleService } from '../service/per-role.service';
import { Observable } from 'rxjs/Observable';

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
  current_per_role: Observable<string>;

  constructor(
    private roleService: RoleService,
    private permissionService: PermissionService,
    private perRoleService: PerRoleService,
    private dialog: MdDialog,
    private store$: Store<NavState>) {
    this.store$.dispatch({type: CHANGE, payload: {title: '角色列表'}});
    roleService.getRoles().subscribe(datas => {
      this.dataBase = new TableDataBase(JSON.parse(JSON.stringify(datas)));
      this.dataSource = new TableDataSource(this.dataBase);
    });
    permissionService.getPermission().subscribe(datas => {
      this.permissions = JSON.parse(JSON.stringify(datas));
    });
  }

  /**
   * 添加角色
   * @param $event
   */
  createRole(inputName): void {
    this.roleService.addRole({name: inputName.value}).subscribe(
      data => {
        this.dataBase.addData(data);
        inputName.value = "";
      },
      error => {
        this.dialog.open(MessageDialog, {data: error});
      }
    );
  }

  /**
   * 删除角色
   */
  deleteRole(id: string): void {
    this.roleService.deleteRole(id).subscribe(
      () => {
        this.dataBase.deleteData(id);
      },
      error => {
        this.dialog.open(MessageDialog, {data: error});
      });
  }

  /**
   * 编辑角色选择
   * @param {string} id
   */
  changeRoles(id: string) {
    this.current_per_role = this.perRoleService.getPerRoles(id).map( data => {
      return JSON.stringify(data);
    })
  }

  change($event) {
    // console.log($event);
  }
}