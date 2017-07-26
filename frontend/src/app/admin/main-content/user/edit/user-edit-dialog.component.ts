import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { AdminUser } from "../../../../common/model/admin-user";

/**
 * 用户添加dialog
 */
@Component({
  templateUrl: './user-edit-dialog.component.html'
})
export class UserEditDialogComponent implements OnInit {
  private api_user_update_url = "/api/admin/user/update";
  private errorMsg: string;
  private editForm: FormGroup;
  private submitted: boolean = false;

  constructor(private dialogRef: MdDialogRef<UserEditDialogComponent>,
              @Inject(MD_DIALOG_DATA) private user: AdminUser,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  // 创建登陆表单
  buildForm(): void {
    this.editForm = new FormGroup({
      id: new FormControl(this.user.id),
      username: new FormControl(this.user.username),
      usernameView: new FormControl({value: this.user.username, disabled: true}),
      nickname: new FormControl(this.user.nickname, [Validators.required, Validators.minLength(4)]),
      createDate: new FormControl(this.user.createDate),
      password: new FormControl('', Validators.minLength(6)),
      status: new FormControl(this.user.status)
    });

    this.editForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any): void {
    if(!this.editForm) {
      return;
    }

    const form = this.editForm;
    for(const field in this.formErrors) {
      // clear previous error message(if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if(control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] = messages[key];
        }
      }
    }
  }

  /**
   * 表单提交
   * @param values
   */
  public onSubmit(values: Object): void {
    this.submitted = true;
    if(this.editForm.valid) {
      this.http.put(this.api_user_update_url, values, {
        headers: new HttpHeaders().set('Authorization', `${sessionStorage.getItem("jwtToken")}`)
      }).subscribe(
        () => {
          this.dialogRef.close("updateUser");
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

  formErrors = {
    'nickname': '',
    'password': '',
    'repeatPassword': ''
  };

  validationMessages = {
    'nickname': {
      'required': '不能为空！',
      'minlength': '不能少于4个字符！'
    },
    'password': {
      'required': '不能为空！',
      'minlength': '不能少于6个字符！'
    },
    'repeatPassword': {
      'validateEqual': '两次输入不一致！'
    }
  }
}
