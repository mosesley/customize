import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './service/login.service';
import { Router } from '@angular/router';

/**
 * Login component
 * Created by maxu0 on 2017/5/31.
 */
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  private loginForm: FormGroup;
  private loginError: string;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {

  }

  ngOnInit(): void {
    this.buildForm();
  }

  // 创建登陆表单
  buildForm(): void {
    this.loginForm = this.fb.group({
      'username': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    })
  }

  // 登陆
  onSubmit(values: Object): void {
    if(this.loginForm.valid) {
      this.loginService.loginCheck(values)
        .subscribe(res => {
          if(res.status && res.status.endsWith("error")) {
            this.loginError = res.statusText;
          } else {
            let redirect = this.loginService.redirectUrl ? this.loginService.redirectUrl : "/admin/index";
            this.router.navigate([redirect]);
          }
        });
    }
  }

}