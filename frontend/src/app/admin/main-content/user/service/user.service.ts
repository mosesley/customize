import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
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
  private httpHeaders = new Headers({'Content-Type': 'application/json',
                                     'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem("loginUser")).token}`});
  private httpOptions = new RequestOptions({ headers: this.httpHeaders});

  constructor(private http: Http) {

  }

  /**
   * Get user list
   * @returns {Observable<R|T>}
   */
  getUsers(): Observable<Response> {
    return this.http.get(`${this.user_api_url}/list`, this.httpOptions)
      .map(HttpUtil.extractData)
      .catch(HttpUtil.handleError);
  }

  /**
   * 添加用户
   * @returns {Observable<R|T>}
   */
  addUser(user: Object): Observable<Response> {
    return this.http.post(`${this.user_api_url}/add`, JSON.stringify(user), this.httpOptions)
      .map(HttpUtil.extractData)
      .catch(HttpUtil.handleError);
  }

  /**
   * 删除用户
   * @param id
   * @returns {Observable<R|T>}
   */
  deleteUser(id: string): Observable<Response> {
    return this.http.delete(`${this.user_api_url}/${id}/delete`, this.httpOptions)
      .catch(HttpUtil.handleError);
  }

  /**
   * 更新用户
   * @param user
   * @returns {Observable<R|T>}
   */
  updateUser(user: Object): Observable<Response> {
    return this.http.put(`${this.user_api_url}/update`, JSON.stringify(user), this.httpOptions)
      .map(HttpUtil.extractData)
      .catch(HttpUtil.handleError);
  }
}
