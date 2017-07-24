import { DataSource } from '@angular/cdk';
import { MdPaginator, MdSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';


/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way.
 */
export class ExampleDataSource<T> extends DataSource<T> {
  resultsLength: number = 0;
  isLoadingResults: boolean;
  private _dataChange = new BehaviorSubject('');
  get dataChange(): string {
    return this._dataChange.value;
  }

  set dataChange(value: string) {
    this._dataChange.next(value);
  }

  constructor(private url: string,
              private http: HttpClient,
              private sort: MdSort,
              private paginator: MdPaginator) {
    super();
  }

  connect(): Observable<T[]> {
    const displayDataChanges = [
      this.sort.mdSortChange,
      this.paginator.page,
      this._dataChange
    ];

    // If the user changes the sort order, reset back to the first page.
    this.sort.mdSortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
    });

    return Observable.merge(...displayDataChanges)
      .startWith(null)
      .switchMap(() => {
        this.isLoadingResults = true;
        return this.http.get(`${this.url}/list`, {
          params: new HttpParams()
            .append('sort', `${this.sort.active}`)
            .append('order', `${this.sort.direction}`)
            .append('page', `${this.paginator.pageIndex}`)
            .append('pageSize', `${this.paginator.pageSize}`),
          headers: new HttpHeaders().set('Authorization', `${JSON.parse(sessionStorage.getItem("loginUser")).token}`)
        });
      })
      .map(result => {
        console.log(result);
        // if (!result) {
        //   return [];
        // }
        // this.resultsLength = result.json().totalElements;
        // this.isLoadingResults = false;
        // return JSON.parse(JSON.stringify(result.json().content)) as T[];
        return null;
      });
  }

  disconnect(): void {

  }
}
