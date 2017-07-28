import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MdDialog } from "@angular/material";
import { Title } from "@angular/platform-browser";
import { Store } from "@ngrx/store";
import { MessageDialog } from "../../../common/dialog/message-dialog";
import { AppConfig } from "../../../common/model/app-config";
import { AC_CHANGE, NAV_CHANGE, NavState } from "../../../common/reducer/nav-reducer";

/**
 * 系统设置模块
 * @Author 马旭
 * @Date 2017/7/28-10:46
 */
@Component({
    templateUrl: './app-config.component.html'
})
export class AppConfigComponent implements OnInit{
  private api_appConfig_url = "/api/admin/appConfig";
  private configForm: FormGroup;
  private errorMsg: string;
  private submitted: boolean = false;

  constructor(private pageTitle: Title,
              private http: HttpClient,
              private store$: Store<NavState>,
              private appConfigStore$: Store<AppConfig>,
              private dialog: MdDialog) {
    this.store$.dispatch({type: NAV_CHANGE, payload: {title: '系统信息'}});
    this.pageTitle.setTitle(`Admin-appConfig`);
    this.http.get<AppConfig>(`${this.api_appConfig_url}`).subscribe(data => {
      this.configForm.setControl('id', new FormControl(data.id));
      this.configForm.setControl('appName', new FormControl(data.appName, [Validators.required, Validators.minLength(2)]));
      this.configForm.setControl('email', new FormControl(data.email, Validators.email));
    });
  }

  ngOnInit():void {
    this.configForm = new FormGroup({
      id: new FormControl(),
      appName: new FormControl(),
      email: new FormControl()
    });

    this.configForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any): void {
    if(!this.configForm) {
      return;
    }

    const form = this.configForm;
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

  formErrors = {
    'appName': '',
    'email': '',
  };

  validationMessages = {
    'appName': {
      'required': '不能为空！',
      'minlength': '不能少于2个字符！'
    },
    'email': {
      'email': '电子邮件地址无效！'
    },
  };

  /**
   * 表单提交
   * @param values
   */
  public onSubmit(values: Object): void {
    this.submitted = true;
    if(this.configForm.valid) {
      this.http.post<AppConfig>(this.api_appConfig_url, values, {
        headers: new HttpHeaders().set('Authorization', `${sessionStorage.getItem("jwtToken")}`)
      })
        .subscribe(appConfig => {
          this.appConfigStore$.dispatch({type: AC_CHANGE, payload: appConfig});
          this.dialog.open(MessageDialog, { data: '修改成功' })
        }, (error: HttpErrorResponse) => {
          this.errorMsg = error.error.message;
        });
    }
  }

}
