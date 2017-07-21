import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../service/user.service';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { CHANGE, NavState } from '../../../../common/reducer/nav-reducer';
import { MdDialog } from '@angular/material';
import { MessageDialog } from '../../../../common/dialog/message-dialog';

/**
 * User list component
 * Created by maxu0 on 2017/6/13.
 */
@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  // user json data
  source: LocalDataSource = new LocalDataSource();

  // ng2-smart-table setting
  settings = {
    actions: {
      columnTitle: "操作"
    },
    add: {
      addButtonContent: "<i class='material-icons'>person_add</i>",
      createButtonContent: "<i class='material-icons'>check_circle</i>",
      cancelButtonContent: "<i class='material-icons'>cancel</i>",
      confirmCreate: true
    },
    delete: {
      deleteButtonContent: "<i class='material-icons'>delete_forever</i>",
      confirmDelete: true
    },
    edit: {
      editButtonContent: "<i class='material-icons'>mode_edit</i>",
      saveButtonContent: "<i class='material-icons'>check_circle</i>",
      cancelButtonContent: "<i class='material-icons'>cancel</i>",
      confirmSave: true
    },
    pager: {
      perPage: 10
    },
    columns: {
      username: {
        title: '用户名',
        editable: false,
      },
      nickname: {
        title: '用户昵称'
      },
      password: {
        title: '登陆密码',
        valuePrepareFunction: () => {
          return "***********";
        },
        filter: false,
        sort: false
      },
      status: {
        title: '状态',
        valuePrepareFunction: (status) => {
          if(status) {
            return "启用";
          } else {
            return "停用";
          }
        },
        defaultValue: true,
        editor: {
          type: 'list',
          config: {
            list: [
              {value: true, title: '启用'},
              {value: false, title: '停用'}
            ]
          }
        },
        filter: {
          type: 'list',
          config: {
            list: [
              {value: true, title: '启用'},
              {value: false, title: '停用'}
            ]
          }
        }
      },
      createDate: {
        title: '创建时间',
        editable: false,
        addable: false,
        valuePrepareFunction: (date) => {
          return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
        },
        filterFunction: (cell, search) => {
          return this.datePipe.transform(cell, 'yyyy-MM-dd HH:mm:ss').includes(search);
        }
      },
      admin: {
        title: '权限',
        editable: false,
        addable: false,
        sort: false,
        valuePrepareFunction: (admin) => {
          if(admin) {
            return "超级管理员"
          } else {
            return "普通用户"
          }
        }
      }
    }
  };

  constructor(private userService: UserService, private dialog: MdDialog, private datePipe: DatePipe, private store$: Store<NavState>) {
    this.store$.dispatch({type: CHANGE, payload: {title: '用户列表'}});
    this.userService.getUsers().subscribe(data => {
      this.source.load(JSON.parse(JSON.stringify(data)) as Array<any>)
    });
  }

  /**
   * 添加用户
   * @param $event
   */
  createUser($event): void {
    if($event.newData.username.length <= 0) {
      this.dialog.open(MessageDialog, {data: '用户名不能为空'});
      $event.confirm.reject();
      return;
    }

    if($event.newData.nickname.length <= 0) {
      this.dialog.open(MessageDialog, {data: '用户昵称不能为空'});
      $event.confirm.reject();
      return;
    }

    if($event.newData.password.length < 6) {
      this.dialog.open(MessageDialog, {data: '登陆密码不能少于6位'});
      $event.confirm.reject();
      return;
    }

    this.userService.addUser($event.newData).subscribe(
      data => {
        $event.confirm.resolve(JSON.parse(JSON.stringify(data)));
      },
      error => {
        this.dialog.open(MessageDialog, {data: error});
        $event.confirm.reject();
      }
    );
  }

  /**
   * 删除用户
   */
  deleteUser($event): void {
    this.userService.deleteUser($event.data.id).subscribe(
      () => {
        $event.confirm.resolve();
      },
      error => {
        this.dialog.open(MessageDialog, {data: error});
        $event.confirm.reject();
      }
    );
  }

  /**
   * 更新用户
   * @param $event
   */
  updateUser($event): void {
    if ($event.newData.nickname.length <= 0) {
      this.dialog.open(MessageDialog, {data: '用户昵称不能为空'});
      $event.confirm.reject();
      return;
    }

    if ($event.newData.password.length > 0 && $event.newData.password.length < 6) {
      this.dialog.open(MessageDialog, {data: '如果要修改密码，密码长度必须不少于6位'});
      $event.confirm.reject();
      return;
    }

    this.userService.updateUser($event.newData).subscribe(
      data => {
        $event.confirm.resolve(JSON.parse(JSON.stringify(data)));
      },
      error => {
        this.dialog.open(MessageDialog, {data: error});
        $event.confirm.reject();
      }
    )
  }
}
