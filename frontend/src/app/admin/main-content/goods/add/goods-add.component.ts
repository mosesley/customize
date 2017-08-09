import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Goods } from "../../../../common/model/goods";
import { NAV_CHANGE, NavState } from "../../../../common/reducer/nav-reducer";
import { Store } from "@ngrx/store";

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

  constructor(private store$: Store<NavState>,
              private http: HttpClient) {
    this.store$.dispatch({type: NAV_CHANGE, payload: {title: '商品添加'}});
  }

  ngOnInit(): void {
    this.buildForm();
  }

  // 创建登陆表单
  buildForm(): void {
    this.addForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(4)]),
      number: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      price: new FormControl(null, [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]),
      labels: new FormControl(),
      des: new FormControl(),
      showImg: new FormControl(null, Validators.required),
      dzImg: new FormControl()
    });

    this.addForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any): void {
    if(!this.addForm) {
      return;
    }

    const form = this.addForm;
    for(const field in this.formErrors) {
      // clear previous error message(if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if(control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] = messages[key];
        }
      }
    }
  }

  uploadInput($event) {
    if($event.type === 'addedToQueue') {
      this.addForm.setControl('showImg', new FormControl($event.file.nativeFile))
    }
  }

  /**
   * 表单提交
   * @param values
   */
  public onSubmit(goods: Goods): void {
    this.submitted = true;
    if(goods.labels) {
      goods.labels = goods.labels.toString().split(/[,,，]/);
    }


    console.log(JSON.stringify(goods));
    // if(this.addForm.valid) {
    //   this.http.post(this.api_goods_add_url, values, {
    //     headers: new HttpHeaders().set('Authorization', `${sessionStorage.getItem("jwtToken")}`)
    //   }).subscribe(
    //     () => {
    //       this.dialogRef.close("addUser");
    //     },
    //     (error: HttpErrorResponse) => {
    //       if (error.error instanceof Error) {
    //         // A client-side or network error occurred. Handle it accordingly.
    //         // console.log('An error occurred:', error.error.message);
    //         this.errorMsg = error.error.message;
    //       } else {
    //         // The backend returned an unsuccessful response code.
    //         // The response body may contain clues as to what went wrong,
    //         // console.log(`Backend returned code ${error.status}, body was: ${error.error.message}`);
    //         this.errorMsg = error.error.message;
    //       }
    //     });
    // }
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
