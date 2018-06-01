import {Component, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HostService} from "../../../services/host.service";
import {Director} from "../../../models/Director";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../models/User";
import {College} from "../../../models/College";
import {DirectorsService} from "../../../services/directors.service";
import {CollegesService} from "../../../services/colleges.service";

@Component({
	selector: 'edit-director',
	templateUrl: './editDirector.component.html',
})
export class EditDirectorComponent{

	director: Director = new Director();
	colleges: College[] = [];
	@Input()id: number;

	constructor(
		private http: HttpClient,
		private host: HostService,
		private router: ActivatedRoute,
		private directorsService: DirectorsService,
		private collegesService: CollegesService
	) {}


	ngOnInit() {
		this.director.user = new User();
		this.director.college = new College();
		if (this.id === undefined)
      this.router.params.subscribe(p => this.id = +p['id']);
		this.directorsService.getDirector(this.id).subscribe(res => this.director = res as Director);
		this.collegesService.getFreeColleges().subscribe(res => this.colleges = res as College[])
	}

	onDirectorUpdate() {
		this.directorsService.putDirector(this.id, this.director).subscribe();
	}
}
