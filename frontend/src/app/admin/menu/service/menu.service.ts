import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpUtil } from '../../../common/utils/http-util';
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
  getMenus(): Observable<Response> {
    return this.http.post(this.menu_api_url, sessionStorage.getItem("loginUser"), HttpUtil.httpOptions)
      .map(HttpUtil.extractData)
      .catch(HttpUtil.handleError);
  }
}
