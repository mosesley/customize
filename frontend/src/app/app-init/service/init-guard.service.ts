import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from "@angular/common/http";
import { AppConfig } from "../app-config";
import 'rxjs/add/operator/map';

/**
 * App initialize route guard
 * Created by maxu0 on 2017/5/9.
 */
@Injectable()
export class InitGuard implements CanActivate {
  private init_url_api = "/api/appConfig";

  constructor(private router: Router, private http: HttpClient) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.checkInit();
  }

  /**
   * check app init status
   * @returns {boolean}
   */
  checkInit(): Observable<boolean> | boolean {
    return this.http.get<AppConfig[]>(this.init_url_api)
      .map(data => {
        if(data.length) { // 系统已经初始化完成
          this.router.navigate(['/admin']);
          return false;
        } else { // 系统还没有被初始化，需要初始化
          return true;
        }
      });
  }
}
