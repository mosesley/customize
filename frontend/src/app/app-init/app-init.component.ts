import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InitService } from './service/init.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

/**
 * App Initialize Component
 * Created by maxu0 on 2017/5/9.
 */
@Component({
  templateUrl: './app-init.component.html',
  styleUrls: ['./app-init.component.scss'],
})
export class AppInitComponent implements OnInit{
  private initForm: FormGroup;
  private submitted: boolean = false;

  constructor(private fb: FormBuilder, private initService: InitService, private router: Router, private pageTitle: Title) {
    this.pageTitle.setTitle(`App-init`);
  }

  ngOnInit():void {
    this.buildForm();
  }

  /**
   * 创建初始化表单
   */
  buildForm(): void {
    this.initForm = this.fb.group({
      'appName': ['', [Validators.required, Validators.minLength(2)]],
      'adminName': ['', [Validators.required, Validators.minLength(4)]],
      'email': ['', [Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'repeatPassword': ['', [Validators.required]]
    });

    this.initForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any): void {
    if(!this.initForm) {
      return;
    }

    const form = this.initForm;
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
    if(this.initForm.valid) {
      this.initService.initAppConfig(values)
        .subscribe(appConfig => {
          if(appConfig.id) {
            //  系统初始化完成，跳转到后台登陆页面
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/init']);
          }
        });
    }
  }

  formErrors = {
    'appName': '',
    'adminName': '',
    'email': '',
    'password': '',
    'repeatPassword': ''
  };

  validationMessages = {
    'appName': {
      'required': '不能为空！',
      'minlength': '不能少于2个字符！'
    },
    'adminName': {
      'required': '不能为空！',
      'minlength': '不能少于4个字符！'
    },
    'email': {
      'email': '电子邮件地址无效！'
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