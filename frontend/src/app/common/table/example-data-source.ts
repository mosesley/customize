import { DataSource } from '@angular/cdk';
import { MdPaginator, MdSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ExampleHttpService } from './example-http-service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
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

  constructor(private service: ExampleHttpService,
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
        return this.service.getData(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
      })
      .map(result => {
        if (!result) {
          return [];
        }
        this.resultsLength = result.json().totalElements;
        this.isLoadingResults = false;
        return JSON.parse(JSON.stringify(result.json().content)) as T[];
      });
  }

  disconnect(): void {

  }
}