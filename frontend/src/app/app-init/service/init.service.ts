import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../model/app-config';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpUtil } from '../../common/utils/http-util';
import { HttpRes } from '../../common/model/httpRes';

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
  appConfigIsExist(): Observable<HttpRes> {
    return this.http.get(this.init_url_api)
      .map(HttpUtil.extractRes)
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
