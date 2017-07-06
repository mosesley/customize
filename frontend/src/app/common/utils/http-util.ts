import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

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
  public static httpOptions = new RequestOptions({ headers: HttpUtil.headers, params: {}});

  /**
   * Extract response body json
   * @param res
   * @returns {{}}
   */
  public static extractData(res: Response) {
    return res.json() || {};
  }

  /**
   * Handle http error
   * @param error
   */
  public static handleError(error: Response | any) {
    let errMsg: string;
    if(error instanceof Response) {
      try {
        const body = error.json() || '';
        errMsg = `${body.message}`;
      } catch (e) {
        errMsg = `${error.statusText}`;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
