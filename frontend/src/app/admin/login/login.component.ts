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
    console.log(JSON.stringify(values));
  }
}
