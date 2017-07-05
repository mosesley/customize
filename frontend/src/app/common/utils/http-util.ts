import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { LoginUser } from '../../admin/top/model/login-user';
/**
 * Http Util
 * Created by maxu0 on 2017/5/9.
 */
export class HttpUtil {

  /**
   * Http headers
   * @type {Headers}
   */
  public static headers = new Headers({'Content-Type': 'application/json'});

  /**
   * Http options
   * @type {RequestOptions}
   */
  public static httpOptions = new RequestOptions({ headers: HttpUtil.headers });

  public static httpActOptions = new RequestOptions({ headers: HttpUtil.headers,
                                                      params: {'userID': (JSON.parse(sessionStorage.getItem("loginUser")) as LoginUser).id }});

  /**
   * Extract response data json
   * @param res
   * @returns {{}}
   */
  public static extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  /**
   * Extract response json
   * @param res
   * @returns {any|{}}
   */
  public static extractRes(res: Response) {
    let body = res.json();
    return body || {};
  }

  /**
   * Handle http error
   * @param error
   */
  public static handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    console.log("Http error handle");
    let errMsg: string;
    if(error instanceof Response) {
      let body = error.json() || '';
      let err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    console.log(errMsg);
    return Observable.throw(errMsg);
  }

}
