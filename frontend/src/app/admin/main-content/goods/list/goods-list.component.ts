import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
/**
 * 后台商品组件
 * @Author 马旭
 * @Date 2017/8/1-16:18
 */
import { Component, ViewChild } from "@angular/core";
import { MdDialog, MdPaginator, MdSort } from "@angular/material";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { MessageDialog } from "../../../../common/dialog/message-dialog";
import { Goods } from "../../../../common/model/goods";
import { NAV_CHANGE, NavState } from "../../../../common/reducer/nav-reducer";
import { TableDataSource } from "../../../../common/table/table-data-source";

@Component({
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.scss']
})
export class GoodsListComponent {
  private api_goods_url = "/api/admin/goods";
  dataSource: TableDataSource<Goods> | null;
  data: Observable<Goods[]>;

  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild(MdSort) sort: MdSort;

  constructor(private http: HttpClient, private dialog: MdDialog, private store$: Store<NavState>) {
    this.store$.dispatch({type: NAV_CHANGE, payload: {title: '商品'}});
  }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = "每页数据条数";
    this.dataSource = new TableDataSource<Goods>(this.api_goods_url, this.http, this.sort, this.paginator)
    this.data = this.dataSource.connect();
  }

  delete(id: string): void {
    console.log(id);
    this.http.get(`${this.api_goods_url}/delete/${id}`, {
      headers: new HttpHeaders().set('Authorization', `${sessionStorage.getItem("jwtToken")}`)
    }).subscribe(
      () => {
        this.dataSource.dataChange = "delete";
      },
      (error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          // console.log('An error occurred:', error.error.message);
          this.dialog.open(MessageDialog, { data: error.error.message })
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          // console.log(`Backend returned code ${error.status}, body was: ${error.error.message}`);
          this.dialog.open(MessageDialog, { data: error.error.message })
        }
      }
    )
  }

}
