import {Injectable} from "@angular/core";
import {HostService} from "./host.service";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseService} from "./base.service";
import {User} from '../models/User';
import {map} from 'rxjs/operators';
import {CookieService} from 'angular2-cookie/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class UsersService extends BaseService{
  constructor(protected http: HttpClient, protected host: HostService, private cookie: CookieService, private router: Router)
  {
    super(http, host);
  }

  getUser() {
    var token = this.cookie.get('token');
    if (token != null) {
      var headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      return this.http.get(this.host.host + '/api/Accounts/GetUser', {headers: headers});
    }
    else {
      this.router.navigate(['/accounts/login']);
    }

  }
}
