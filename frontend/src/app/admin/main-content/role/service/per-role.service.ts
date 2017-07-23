import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpUtil } from '../../../../common/utils/http-util';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/**
 * Admin PermissionRole service
 * Created by maxu0 on 2017/6/15.
 */
@Injectable()
export class PerRoleService {
  private permission_api_url = "/api/admin/per_role";

  constructor(private http: Http) {

  }

  /**
   * Get PermissionRole list
   * @returns {Observable<R|T>}
   */
  getPerRoles(id: string): Observable<Response> {
    return this.http.get(`${this.permission_api_url}/list_by_role/${id}`, HttpUtil.httpOptionsWithToken)
      .map(HttpUtil.extractData)
      .catch(HttpUtil.handleError);
  }
}
