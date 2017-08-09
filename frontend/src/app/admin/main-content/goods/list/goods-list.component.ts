/**
 * 后台商品组件
 * @Author 马旭
 * @Date 2017/8/1-16:18
 */
import { Component, ViewChild } from "@angular/core";
import { TableDataSource } from "../../../../common/table/table-data-source";
import { Goods } from "../../../../common/model/goods";
import { MdDialog, MdPaginator, MdSort } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { NAV_CHANGE, NavState } from "../../../../common/reducer/nav-reducer";
import { Observable } from "rxjs/Observable";
import { GoodsAddComponent } from "../add/goods-add.component";

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

}
