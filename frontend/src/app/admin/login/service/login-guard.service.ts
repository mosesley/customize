import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
/**
 * 后台用户路由守卫，查看是否登陆，如果没有登陆，跳转到登陆页面
 * Created by maxu0 on 2017/6/1.
 */
@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    let url:string = state.url;
    return this.checkLogin(url);
  }

  // 检查用户登录情况
  checkLogin(url: string): boolean {
    if(url.endsWith("/admin/login")) {
      return true;
    }

    if(!sessionStorage.getItem('loginUser')) {

      if(url.endsWith("/admin")) {
        this.loginService.redirectUrl = "/admin/index";
      } else {
        this.loginService.redirectUrl = url;
      }

      this.router.navigate(['/admin/login']);
      return false;
    } else {
      if(url.endsWith("/admin")) {
        this.router.navigate(['/admin/index']);
      }
      return true;
    }
  }

}

