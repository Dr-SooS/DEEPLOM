import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {Director} from "../../../models/Director";
import {User} from "../../../models/User";
import {College} from "../../../models/College";
import {DirectorsService} from "../../../services/directors.service";

@Component({
	selector: 'create-director',
	templateUrl: './createDirector.component.html',
})
export class CreateDirectorComponent{

	director: Director = new Director();
	colleges: College[];

	constructor(
		private http: HttpClient,
		private host: HostService,
		private directorsService: DirectorsService
	) {}
	
	ngOnInit() {
		this.director.user = new User();
		this.director.college = new College();
		
		this.http.get(this.host.host + "/api/Colleges/free").subscribe(res => this.colleges = res as College[])
	}

	onDirectorCreate() {
		this.directorsService.postDirector(this.director).subscribe();
	}
}
