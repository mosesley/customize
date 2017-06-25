import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../service/user.service';
import { DatePipe } from '@angular/common';

/**
 * User list component
 * Created by maxu0 on 2017/6/13.
 */
@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
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
      addButtonContent: "<i class='fa fa-plus-circle'></i>",
      createButtonContent: "<i class='fa fa-check-circle'></i>",
      cancelButtonContent: "<i class='fa fa-times-circle'></i>",
      confirmCreate: true
    },
    delete: {
      deleteButtonContent: "<i class='fa fa-trash'></i>",
      confirmDelete: true
    },
    edit: {
      editButtonContent: "<i class='fa fa-pencil'></i>",
      saveButtonContent: "<i class='fa fa-check-circle'></i>",
      cancelButtonContent: "<i class='fa fa-times-circle'></i>",
    },
    pager: {
      perPage: 2
    },
    columns: {
      username: {
        title: '用户名'
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

  constructor(private userService: UserService,  private datePipe: DatePipe) {
    this.userService.getUsers().subscribe(httpRes => {
      this.source.load(httpRes.data as Array<any>)
    });
  }

  /**
   * 添加用户
   * @param event
   */
  openModal(): void {
    // const modalRef = this.ngbModal.open(NgbMsgModalComponent).result.then((result) => {
    //   console.log($event.newData);
    //   $event.confirm.reject();
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //   $event.confirm.reject();
    // });
    // const modalRef = this.ngbModal.open(NgbdModalContent);
    // modalRef.componentInstance.name = "添加用户";
    // modalRef.componentInstance.content = "content";
  }


  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }

}
