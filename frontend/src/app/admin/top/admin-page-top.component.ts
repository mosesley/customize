import { Component, OnInit } from '@angular/core';
import { AdminUser } from '../../common/model/admin-user';
import { Router } from "@angular/router";
import { LoginComponent } from "../login/login.component";
import { JwtHelper } from 'angular2-jwt';

/**
 * Admin page top component
 */
@Component({
  selector: 'admin-page-top',
  templateUrl: './admin-page-top.component.html',
  styleUrls: ['./admin-page-top.component.scss']
})
export class AdminPageTop implements OnInit {
  private jwtHelper: JwtHelper = new JwtHelper();
  private loginUser: AdminUser;

  constructor (private router: Router) { }

  ngOnInit(): void {
    this.loginUser = this.jwtHelper.decodeToken(sessionStorage.getItem('jwtToken'));
  }

  /**
   * 退出登陆
   */
  logout(): void {
    sessionStorage.removeItem("jwtToken");
    LoginComponent.redirectUrl = null;
    this.router.navigate(['/admin/login']);
  }
}
