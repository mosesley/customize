/**
 * Goods Category Component
 * @Author 马旭
 * @Date 2017/7/31-10:51
 */
import { Component, OnInit, ViewChild } from "@angular/core";
import { TableDataSource } from "../../../../common/table/table-data-source";
import { Category } from "../../../../common/model/category";
import { MdDialog, MdPaginator, MdSort } from "@angular/material";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { NAV_CHANGE, NavState } from "../../../../common/reducer/nav-reducer";
import { MessageDialog } from "../../../../common/dialog/message-dialog";

@Component({
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  private api_category_url = "/api/admin/goods/category";

  categoryColumns = ['operation', 'name', 'category'];
  dataSource: TableDataSource<Category> | null;

  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild(MdSort) sort: MdSort;

  constructor(private http: HttpClient, private dialog: MdDialog, private store$: Store<NavState>) {
    this.store$.dispatch({type: NAV_CHANGE, payload: {title: '商品种类'}});
  }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = "每页数据条数";
    this.dataSource = new TableDataSource<Category>(this.api_category_url, this.http, this.sort, this.paginator);
  }

  /**
   * 添加种类
   * @param inputName
   */
  addCategory(inputName):void {
    this.http.post<Category>(`${this.api_category_url}/add`, {name: inputName.value}, {
      headers: new HttpHeaders().set('Authorization', `${sessionStorage.getItem("jwtToken")}`)
    }).subscribe(data => {
        this.dataSource.dataChange = "addCategory";
        inputName.value = "";
      },
      (error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          // console.log('An error occurred:', error.error.message);
          this.dialog.open(MessageDialog, {data: error.error.message});
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          // console.log(`Backend returned code ${error.status}, body was: ${error.error.message}`);
          this.dialog.open(MessageDialog, {data: error.error.message});
        }
      });
  }

  /**
   * 删除种类
   */
  deleteCategory(id: string): void {
    this.http.delete(`${this.api_category_url}/${id}/delete`, {
      headers: new HttpHeaders().set('Authorization', `${sessionStorage.getItem("jwtToken")}`)
    }).subscribe(
      (data) => {
        this.dataSource.dataChange = "deleteCategory";
      },
      (error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          // console.log('An error occurred:', error.error.message);
          this.dialog.open(MessageDialog, {data: error.error.message});
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          // console.log(`Backend returned code ${error.status}, body was: ${error.error.message}`);
          this.dialog.open(MessageDialog, {data: error.error.message});
        }
      });
  }
}
