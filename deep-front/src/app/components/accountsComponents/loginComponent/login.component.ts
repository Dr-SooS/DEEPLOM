import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HostService} from '../../../services/host.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {CookieService} from 'angular2-cookie/core';
import {User} from '../../../models/User';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  loginData;

  constructor(private http: HttpClient,
              private host: HostService,
              private cookie: CookieService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginData = {
      email: '',
      pass: ''
    };
  }


  login() {
    var body = {Email: this.loginData.email, Password: this.loginData.pass};
    this.http.post(this.host.host + '/api/accounts/login', body).subscribe(res => {
      this.cookie.put('token', res.toString());
      this.snackBar.open('Вход выполнен успешно', null,  {duration: 2000});

      var headers = new HttpHeaders().set('Authorization', 'Bearer ' + res.toString());
      return this.http.get(this.host.host + '/api/Accounts/GetUser', {headers: headers}).subscribe(usr => {
        this.router.navigate([(usr as User).role.toLowerCase()])
      });
    });
  }
}
