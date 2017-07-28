import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { JwtHelper } from 'angular2-jwt';
import { Observable } from "rxjs/Observable";
import { AdminUser } from '../../common/model/admin-user';
import { AppConfig } from "../../common/model/app-config";
import { AC_CHANGE } from "../../common/reducer/nav-reducer";
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
  private api_appConfig_url = "/api/admin/appConfig";
  private jwtHelper: JwtHelper = new JwtHelper();
  private loginUser: AdminUser;
  AppConfig: Observable<AppConfig>;

  constructor (private router: Router, private appConfigStore$: Store<AppConfig>, private http: HttpClient) {
    this.AppConfig = this.appConfigStore$.select('appNameReducer');
    this.http.get<AppConfig>(`${this.api_appConfig_url}`).subscribe( data => {
      this.appConfigStore$.dispatch({type: AC_CHANGE, payload: data});
    })
  }

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
