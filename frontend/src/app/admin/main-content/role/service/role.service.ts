import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpUtil } from '../../../../common/utils/http-util';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/**
 * Admin Role service
 * Created by maxu0 on 2017/6/15.
 */
@Injectable()
export class RoleService {
  private user_api_url = "/api/admin/role";

  constructor(private http: Http) {

  }

  /**
   * Get user list
   * @returns {Observable<R|T>}
   */
  getRoles(): Observable<Response> {
    return this.http.get(`${this.user_api_url}/list`, HttpUtil.httpOptionsWithToken)
      .map(HttpUtil.extractData)
      .catch(HttpUtil.handleError);
  }

  /**
   * 添加用户
   * @returns {Observable<R|T>}
   */
  addRole(role: Object): Observable<Response> {
    return this.http.post(`${this.user_api_url}/add`, JSON.stringify(role), HttpUtil.httpOptionsWithToken)
      .map(HttpUtil.extractData)
      .catch(HttpUtil.handleError);
  }

  /**
   * 删除用户
   * @param id
   * @returns {Observable<R|T>}
   */
  deleteRole(id: string): Observable<Response> {
    return this.http.delete(`${this.user_api_url}/${id}/delete`, HttpUtil.httpOptionsWithToken)
      .catch(HttpUtil.handleError);
  }

  /**
   * 更新用户
   * @param user
   * @returns {Observable<R|T>}
   */
  updateRole(role: Object): Observable<Response> {
    return this.http.put(`${this.user_api_url}/update`, JSON.stringify(role), HttpUtil.httpOptionsWithToken)
      .map(HttpUtil.extractData)
      .catch(HttpUtil.handleError);
  }
}
