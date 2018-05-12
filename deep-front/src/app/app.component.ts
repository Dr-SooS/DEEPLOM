import {Component} from '@angular/core';
import {HostService} from "./services/host.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
	selector: 'app',
	templateUrl: './app.component.html',
})
export class AppComponent {
	// constructor(protected http: HttpClient, protected host: HostService,private cookieService: CookieService) { }
	
	// ngOnInit() {
	// 	var token = this.cookieService.get("token");
	// 	if (token != null) {
	// 		var headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
	// 		this.http.get(this.host.host + '/api/Accounts/GetUser', {headers: headers}).subscribe(res => {
	// 			console.log(res);
	// 		})
	// 	}
			
	// }
}
