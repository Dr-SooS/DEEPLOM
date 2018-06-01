import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {PermissionsService} from '../services/permissions.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HostService} from '../services/host.service';
import {User} from '../models/User';
import {map} from 'rxjs/operators';
import {CookieService} from 'angular2-cookie/core';
import {UsersService} from '../services/users.service';

@Injectable()
export class TeacherGuard implements CanActivate {

  constructor(
    private permissions: PermissionsService,
    private cookie: CookieService,
    private http: HttpClient,
    private host: HostService,
    private router: Router,
    private usersService: UsersService) {}

  canActivate() {
    return this.usersService.getUser().pipe(map(res => {
      if (this.permissions.IsInRole(res as User, 'Teacher') || this.permissions.IsInRole(res as User, 'Curator'))
        return true;
      else {
        this.router.navigate(['/accounts/login']);
        return false;
      }
    }));
  }
}
