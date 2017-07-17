import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpUtil } from '../../../../common/utils/http-util';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/**
 * Admin User service
 * Created by maxu0 on 2017/6/15.
 */
@Injectable()
export class UserService {
  private user_api_url = "/api/admin/user";

  constructor(private http: Http) {

  }

  /**
   * Get user list
   * @returns {Observable<R|T>}
   */
  getUsers(): Observable<Response> {
    return this.http.get(`${this.user_api_url}/list`, HttpUtil.httpOptionsWithToken)
      .map(HttpUtil.extractData)
      .catch(HttpUtil.handleError);
  }

  /**
   * 添加用户
   * @returns {Observable<R|T>}
   */
  addUser(user: Object): Observable<Response> {
    return this.http.post(`${this.user_api_url}/add`, JSON.stringify(user), HttpUtil.httpOptionsWithToken)
      .map(HttpUtil.extractData)
      .catch(HttpUtil.handleError);
  }

  /**
   * 删除用户
   * @param id
   * @returns {Observable<R|T>}
   */
  deleteUser(id: string): Observable<Response> {
    return this.http.delete(`${this.user_api_url}/${id}/delete`, HttpUtil.httpOptionsWithToken)
      .catch(HttpUtil.handleError);
  }

  /**
   * 更新用户
   * @param user
   * @returns {Observable<R|T>}
   */
  updateUser(user: Object): Observable<Response> {
    return this.http.put(`${this.user_api_url}/update`, JSON.stringify(user), HttpUtil.httpOptionsWithToken)
      .map(HttpUtil.extractData)
      .catch(HttpUtil.handleError);
  }
}
