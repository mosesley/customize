import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpUtil } from '../../../../common/utils/http-util';
import { HttpRes } from '../../../../common/model/httpRes';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
/**
 * Menu service
 * Created by maxu0 on 2017/6/2.
 */
@Injectable()
export class MenuService {
  private menu_api_url = "/api/admin/menu";

  constructor(private http: Http) { }

  /**
   * Get Menu list by loginUser
   * @returns {Observable<R|T>}
   */
  getMenus(): Observable<HttpRes> {
    console.log(sessionStorage.getItem("loginUser"));
    return this.http.post(this.menu_api_url, sessionStorage.getItem("loginUser"), HttpUtil.httpOptions)
      .map(HttpUtil.extractRes)
      .catch(HttpUtil.handleError);
  }
}
