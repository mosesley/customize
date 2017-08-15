import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { JwtToken } from "../../common/model/jwt-token";

/**
 * Login component
 * Created by maxu0 on 2017/5/31.
 */
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  public static redirectUrl: string; // Store the url so we can redirect after logging in
  public login_url_api = "/api/admin/login";
  public loginForm: FormGroup;
  public loginError: string;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private router: Router,
              private pageTitle: Title) {
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
      this.http.post<JwtToken>(this.login_url_api, values).subscribe(
        data => {
          sessionStorage.setItem("jwtToken", `Bearer ${data.token}`);
          let redirect = LoginComponent.redirectUrl ? LoginComponent.redirectUrl : "/admin/index";
          this.router.navigate([redirect]);
        },
        (error: HttpErrorResponse) => {
          sessionStorage.removeItem("jwtToken");
          if (error.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            // console.log('An error occurred:', error.error.message);
            this.loginError = error.error.message;
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // console.log(`Backend returned code ${error.status}, body was: ${error.error.message}`);
            this.loginError = error.error.message;
          }
        }
      );
    }
  }

}
