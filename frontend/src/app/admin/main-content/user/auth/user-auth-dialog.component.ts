import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { AdminUser } from "../../../../common/model/admin-user";
import { AdminRole } from "../../../../common/model/admin-role";
import { Observable } from "rxjs/Observable";

/**
 * 用户角色设置
 */
@Component({
  templateUrl: './user-auth-dialog.component.html'
})
export class UserAuthDialogComponent implements OnInit {
  private api_user_url = "/api/admin/user";
  private api_role_url = "/api/admin/role";

  adminRoles: Observable<AdminRole[]>;
  userRoleIds: string[] = [];
  errorMsg: string;

  constructor(private dialogRef: MdDialogRef<UserAuthDialogComponent>,
              @Inject(MD_DIALOG_DATA) private data: AdminUser,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    for(let role of this.data.roles) {
      this.userRoleIds.push(role.id);
    }

    this.adminRoles = this.http.get<AdminRole[]>(`${this.api_role_url}/listAll`, {
      headers: new HttpHeaders().set('Authorization', `${sessionStorage.getItem("jwtToken")}`)
    });
  }

  isCheck(roleId: string): boolean {
    console.log("check");
    return this.userRoleIds.includes(roleId);
  }

  /**
   * 设置用户角色
   * @param $event
   * @param {string} userId
   */
  changeRoles($event, userId: string) {
    this.http.get(`${this.api_user_url}/updateUserRole`, {
      headers: new HttpHeaders().set('Authorization', `${sessionStorage.getItem("jwtToken")}`),
      params: new HttpParams()
        .append("userId", userId)
        .append("roleId", $event.source.id)
        .append("checked", $event.checked)
    }).subscribe(
      (data) => {
        // nothing
      },
      (error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          // console.log('An error occurred:', error.error.message);
          this.errorMsg = error.error.message;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          // console.log(`Backend returned code ${error.status}, body was: ${error.error.message}`);
          this.errorMsg = error.error.message;
        }
      });
  }
}
