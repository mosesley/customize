import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpUtil } from '../../../common/utils/http-util';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

/**
 * App Admin module login service
 * Created by maxu0 on 2017/5/31.
 */
@Injectable()
export class LoginService {
  private login_url_api = "/api/admin/login";
  public redirectUrl: string; // Store the url so we can redirect after logging in

  constructor(private http: Http, private router: Router) { }



  /**
   * 后台登陆service
   * @param values
   * @returns {Observable<R|T>}
   */
  loginCheck(values: Object): Observable<Response> {
    return this.http.post(this.login_url_api, JSON.stringify(values), HttpUtil.httpOptions)
      .map(HttpUtil.extractData)
      .catch(HttpUtil.handleError);
  }

  /**
   * 退出登录
   */
  logout(): void {
    sessionStorage.removeItem("loginUser");
    this.redirectUrl = null;
    this.router.navigate(['/admin/login']);
  }
}