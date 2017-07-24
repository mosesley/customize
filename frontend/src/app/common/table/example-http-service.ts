import { Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

/**
 * An example database that the data source uses to retrieve data for the table.
 */
export class ExampleHttpService {

  constructor(private http: Http, private href: string, private httpOptions: RequestOptions) {}


  /**
   * Get data ues sort,order,page
   * @param {string} sort
   * @param {string} order
   * @param {number} page
   * @returns {Observable<Response>}
   */
  getData(sort: string, order: string, page: number, pageSize: number): Observable<Response> {
    const requestUrl = `${this.href}/list?sort=${sort}&order=${order}&page=${page}&pageSize=${pageSize}`;
    return this.http.get(requestUrl, this.httpOptions)
      .catch(this.handleError);
  }

  /**
   * Get all data
   * @returns {Observable<Response>}
   */
  getAllData(): Observable<Response> {
    const requestUrl = `${this.href}/list`;
    return this.http.get(requestUrl, this.httpOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Add data
   * @returns {Observable<Response>}
   */
  addData(data: Object): Observable<Response> {
    return this.http.post(`${this.href}/add`, JSON.stringify(data), this.httpOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Extract response body json
   * @param res
   * @returns {{}}
   */
  private extractData(res: Response) {
    return res.json() || {};
  }

  /**
   * Handle http error
   * @param error
   */
  private handleError(error: Response | any) {
    let errMsg: string;
    // console.log(JSON.stringify(error));
    if(error instanceof Response) {
      try {
        const body = error.json() || '';
        errMsg = `${body.message}`;
      } catch (e) {
        errMsg = `${error.status}-${error.statusText}`;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}