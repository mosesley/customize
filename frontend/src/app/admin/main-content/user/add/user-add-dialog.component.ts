import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

/**
 * 用户添加dialog
 */
@Component({
  templateUrl: './user-add-dialog.component.html'
})
export class UserAddDialogComponent implements OnInit {
  private api_user_add_url = "/api/admin/user/add";
  private addError: string;
  private addForm: FormGroup;
  private submitted: boolean = false;

  constructor(private dialogRef: MdDialogRef<UserAddDialogComponent>,
              private fb: FormBuilder,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  // 创建登陆表单
  buildForm(): void {
    this.addForm = this.fb.group({
      'username': ['', [Validators.required, Validators.minLength(4)]],
      'nickname': ['', [Validators.required, Validators.minLength(4)]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'repeatPassword': ['', [Validators.required]]
    });

    this.addForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any): void {
    if(!this.addForm) {
      return;
    }

    const form = this.addForm;
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
    if(this.addForm.valid) {
      this.http.post(this.api_user_add_url, values, {
        headers: new HttpHeaders().set('Authorization', `${sessionStorage.getItem("jwtToken")}`)
      }).subscribe(
        () => {
          this.dialogRef.close("addUser");
        },
        (error: HttpErrorResponse) => {
          if (error.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            // console.log('An error occurred:', error.error.message);
            this.addError = error.error.message;
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // console.log(`Backend returned code ${error.status}, body was: ${error.error.message}`);
            this.addError = error.error.message;
          }
        });
    }
  }

  formErrors = {
    'username': '',
    'nickname': '',
    'password': '',
    'repeatPassword': ''
  };

  validationMessages = {
    'username': {
      'required': '不能为空！',
      'minlength': '不能少于4个字符！'
    },
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
