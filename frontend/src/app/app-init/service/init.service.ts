import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../model/app-config';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpUtil } from '../../common/utils/http-util';

/**
 * App initialize service
 * Created by maxu0 on 2017/5/9.
 */
@Injectable()
export class InitService {
  private init_url_api = "/api/appConfig";

  constructor(private http: Http) {}

  /**
   * 判断系统是否已经被初始化
   * @returns {Observable<R|T>}
   */
  appConfigIsExist(): Observable<Response> {
    return this.http.get(this.init_url_api)
      .catch(HttpUtil.handleError);
  }

  /**
   * Initialize App Configuration
   * @param values
   * @returns {Observable<R|T>}
   */
  initAppConfig(values: Object): Observable<AppConfig> {
    return this.http.post(this.init_url_api, JSON.stringify(values), HttpUtil.httpOptions)
      .map(HttpUtil.extractData)
      .catch(HttpUtil.handleError);
  }

}
