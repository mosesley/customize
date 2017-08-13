import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";
import { Goods } from "../../../../common/model/goods";
import { NAV_CHANGE, NavState } from "../../../../common/reducer/nav-reducer";
import { MdDialog } from "@angular/material";
import { MessageDialog } from "../../../../common/dialog/message-dialog";

/**
 * 用户添加dialog
 */
@Component({
  templateUrl: './goods-add.component.html'
})
export class GoodsAddComponent implements OnInit {
  private api_goods_add_url = "/api/admin/goods/add";
  private submitted: boolean = false;
  errorMsg: string;
  addForm: FormGroup;
  showImg: File;
  dz1Img: File;
  dz2Img: File;

  constructor(private store$: Store<NavState>,
              private http: HttpClient,
              private dialog: MdDialog) {
    this.store$.dispatch({ type: NAV_CHANGE, payload: { title: '商品添加' } });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  // 创建登陆表单
  buildForm(): void {
    this.addForm = new FormGroup({
      title: new FormControl('', [ Validators.required, Validators.minLength(4) ]),
      number: new FormControl(null, [ Validators.required, Validators.minLength(4) ]),
      price: new FormControl(null, [ Validators.required, Validators.pattern(/^\d+(\.\d+)?$/) ]),
      labels: new FormControl(),
      des: new FormControl(),
      showImg: new FormControl(null, Validators.required),
      dz1Img: new FormControl(null, Validators.required),
      dz2Img: new FormControl(null, Validators.required)
    });

    this.addForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any): void {
    if ( !this.addForm ) {
      return;
    }

    const form = this.addForm;
    for ( const field in this.formErrors ) {
      // clear previous error message(if any)
      this.formErrors[ field ] = '';
      const control = form.get(field);
      if ( control && control.dirty && !control.valid ) {
        const messages = this.validationMessages[ field ];
        for ( const key in control.errors ) {
          this.formErrors[ field ] = messages[ key ];
        }
      }
    }
  }

  uploadShowImg($event) {
    if ( $event.type === 'addedToQueue' ) {
      this.addForm.setControl('showImg', new FormControl(true));
      this.showImg = $event.file.nativeFile;
    }
  }

  uploadDz1Img($event) {
    if ( $event.type === 'addedToQueue' ) {
      this.addForm.setControl('dz1Img', new FormControl(true));
      this.dz1Img = $event.file.nativeFile;
    }
  }

  uploadDz2Img($event) {
    if ( $event.type === 'addedToQueue' ) {
      this.addForm.setControl('dz2Img', new FormControl($event.file.nativeFile));
      this.dz2Img = $event.file.nativeFile;
    }
  }

  /**
   * 表单提交
   * @param values
   */
  public onSubmit(goods: Goods): void {
    this.submitted = true;
    if ( goods.labels ) {
      goods.labels = goods.labels.toString().split(/[,,，]/);
    }

    let values = new FormData();
    values.append('title', goods.title);
    values.append('number', goods.number);
    values.append('labels', goods.labels.toString());
    values.append('des', goods.des);
    values.append('price', goods.price);

    values.append('showImg', this.showImg);
    values.append('dz1Img', this.dz1Img);
    values.append('dz2Img', this.dz2Img);

    if ( this.addForm.valid ) {
      this.http.post(this.api_goods_add_url, values, {
        headers: new HttpHeaders().set('Authorization', `${sessionStorage.getItem("jwtToken")}`)
      }).subscribe(
        () => {
          this.dialog.open(MessageDialog, { data: '添加成功' })
        },
        (error: HttpErrorResponse) => {
          if ( error.error instanceof Error ) {
            // A client-side or network error occurred. Handle it accordingly.
            // console.log('An error occurred:', error.error.message);
            this.errorMsg = error.error.message;
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // console.log(`Backend returned code ${error.status}, body was: ${error.error.message}`);
            this.errorMsg = error.error.message;
          }
        });
    }
  }

  formErrors = {
    "title": '',
    'number': '',
    'price': ''
  };

  validationMessages = {
    "title": {
      'required': '不能为空！',
      'minlength': '不能少于4个字符！'
    },
    'number': {
      'required': '不能为空！',
      'minlength': '不能少于4个字符！'
    },
    'price': {
      'required': '不能为空!',
      'pattern': '格式不正确'
    }
  }
}
