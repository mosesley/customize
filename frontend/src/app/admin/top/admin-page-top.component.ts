import { Component, OnInit } from '@angular/core';
import { LoginUser } from './model/login-user';
import { LoginService } from '../login/service/login.service';

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

  constructor (private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginUser = JSON.parse(sessionStorage.getItem("loginUser")) as LoginUser;
  }

  logout(): void {
    this.loginService.logout();
  }
}