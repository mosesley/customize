import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './service/login.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

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

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, private pageTitle: Title) {
    this.pageTitle.setTitle(`Admin-login`);
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
      this.loginService.loginCheck(values).subscribe(
        data => {
          sessionStorage.setItem("loginUser", JSON.stringify(data));
          let redirect = this.loginService.redirectUrl ? this.loginService.redirectUrl : "/admin/index";
          this.router.navigate([redirect]);
        },
        error => {
          sessionStorage.removeItem("loginUser");
          this.loginError = error;
        }
      );
    }
  }

}
