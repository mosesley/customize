import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExampleHttpService } from '../../../../common/table/example-http-service';
import { Http } from '@angular/http';
import { HttpUtil } from '../../../../common/utils/http-util';

/**
 * 用户添加dialog
 */
@Component({
  templateUrl: './user-add-dialog.component.html'
})
export class UserAddDialogComponent implements OnInit {
  private user_api_url = "/api/admin/user";
  private addForm: FormGroup;
  private addError: string;
  database: ExampleHttpService | null;
  private submitted: boolean = false;

  constructor(private dialogRef: MdDialogRef<UserAddDialogComponent>,
              private fb: FormBuilder,
              private http: Http) {
    this.database = new ExampleHttpService(http, this.user_api_url, HttpUtil.httpOptionsWithToken);
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
      this.database.addData(values).subscribe(
        () => {
          this.dialogRef.close("addUser");
        },
        error => {
          this.addError = error;
        }
       );
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