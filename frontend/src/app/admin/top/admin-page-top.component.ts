import { Component, OnInit } from '@angular/core';
import { LoginUser } from './model/login-user';
import { Router } from "@angular/router";
import { LoginComponent } from "../login/login.component";

/**
 * Admin page top component
 */
@Component({
  selector: 'admin-page-top',
  templateUrl: './admin-page-top.component.html',
  styleUrls: ['./admin-page-top.component.scss']
})
export class AdminPageTop implements OnInit {
  loginUser: LoginUser;

  constructor (private router: Router) { }

  ngOnInit(): void {
    this.loginUser = JSON.parse(sessionStorage.getItem("jwtToken")) as LoginUser;
  }

  /**
   * 退出登陆
   */
  logout(): void {
    sessionStorage.removeItem("loginUser");
    LoginComponent.redirectUrl = null;
    this.router.navigate(['/admin/login']);
  }
}
