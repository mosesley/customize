import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpUtil } from '../../../../common/utils/http-util';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/**
 * Admin permission service
 * Created by maxu0 on 2017/6/15.
 */
@Injectable()
export class PermissionService {
  private permission_api_url = "/api/admin/permission";

  constructor(private http: Http) {

  }

  /**
   * Get permission list
   * @returns {Observable<R|T>}
   */
  getPermission(): Observable<Response> {
    return this.http.get(`${this.permission_api_url}/list`, HttpUtil.httpOptionsWithToken)
      .map(HttpUtil.extractData)
      .catch(HttpUtil.handleError);
  }
}
