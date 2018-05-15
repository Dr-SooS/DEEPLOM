import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {PermissionsService} from '../services/permissions.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HostService} from '../services/host.service';
import {User} from '../models/User';
import {map} from 'rxjs/operators';
import {CookieService} from 'angular2-cookie/core';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private permissions: PermissionsService,
    private cookie: CookieService,
    private http: HttpClient,
    private host: HostService,
    private router: Router) {}

  canActivate() {
    var token = this.cookie.get('token');
    if (token != null) {
      var headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      return this.http.get(this.host.host + '/api/Accounts/GetUser', {headers: headers}).pipe(map(res => {
        if (this.permissions.IsInRole(res as User, 'Admin'))
          return true;
        else {
          this.router.navigate(['/accounts/login']);
          return false;
        }
      }));
    }
    else {
      this.router.navigate(['/accounts/login']);
      return false;
    }
  }
}
