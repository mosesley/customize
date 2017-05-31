import { Injectable } from '@angular/core';
import { User } from '../model/user';

/**
 * App Admin module login service
 * Created by maxu0 on 2017/5/31.
 */
@Injectable()
export class LoginService {
  private login_url_api = "/api/admin/login";
  public static loginUser: User = null;



}